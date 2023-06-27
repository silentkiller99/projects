const { Kafka } = require("kafkajs");
const {
  userUseCases,
  folderUseCases,
  emailUseCases,
  kafkaProducer,
  emailFolderAssociationUseCases,
  emailRecipientsUsecase,
} = require("../use-cases");
const config = require("../config");

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokerList,
});
const consumer = kafka.consumer({ groupId: "foldersFetched" });
const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({
    topic: config.kafkaTopics.folderCreated,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({ topic, partition });
      if (!message.value) {
        console.log("value is undefined");
        return;
      }
      const userId = message.value?.toString();
      const accessTokenRes = await userUseCases.getUser({
        column: "access_token",
        id: userId,
        databaseName: config.cockroach.dbName,
      });

      const accessToken = accessTokenRes[0].access_token;

      const folderDetails = await folderUseCases.getPriorityFolder({
        userId,
        databaseName: config.cockroach.dbName,
      });

      const folderId = folderDetails[0].provider_id;
      const nextPageToken = folderDetails[0].next_page_token;
      const { emails, newNextPageToken } =
        await emailUseCases.fetchFolderEmails({
          id: folderId,
          accessToken: accessToken?.toString(),
          nextPageToken,
        });
      emails.forEach(async (email) => {
        // Skip processing if email is in  DRAFT, or SPAM
        if (
          email.labelIds.includes("DRAFT") ||
          email.labelIds.includes("SPAM")
        ) {
          console.log("Skipping email in  DRAFT, or SPAM.");
          return;
        }

        const emailId = await main({
          email,
          userId,
          accessToken: accessToken?.toString(),
        });

        const result =
          await emailFolderAssociationUseCases.createEmailFolderAssociation({
            emailId: emailId[0].id,
            folderId: folderDetails[0].id,
            databaseName: config.cockroach.dbName,
          });
      });
      //db call to insert next page token
      if (newNextPageToken) {
        const columnsToUpdate = {
          next_page_token: newNextPageToken,
          sync_status: "FETCHING",
          // Add more columns here as needed
        };

        const folderId = folderDetails[0].id;
        const databaseName = config.cockroach.dbName;

        await folderUseCases.updateFolder({
          columns: columnsToUpdate,
          id: folderId,
          databaseName: databaseName,
        });
        await kafkaProducer({
          topic: config.kafkaTopics.folderCreated,
          messages: [
            {
              value: userId?.toString(),
            },
          ],
        });
      } else {
        const columnsToUpdate = {
          sync_status: "FETCHED",
          // Add more columns here as needed
        };

        const folderId = folderDetails[0].id;
        const databaseName = config.cockroach.dbName;

        await folderUseCases.updateFolder({
          columns: columnsToUpdate,
          id: folderId,
          databaseName: databaseName,
        });
      }
    },
  });
};

async function main({ email, userId, accessToken }) {
  const subject = email.payload.headers.find(
    (header) => header.name === "Subject"
  ).value;
  const bodyPart = email.payload.parts
    ? email.payload.parts[0].body.mimeType
    : email.payload.body.mimeType;
  const bodyType = bodyPart === "text/plain" ? "TEXT" : "HTML";

  const parsedEmail = await emailUseCases.formatEmail({
    response: email,
  });
  const attachments = parsedEmail.attachments || null;
  const inline = parsedEmail.inline || null;

  const bodyText = parsedEmail.textPlain || null;
  let bodyHtml = parsedEmail.textHtml || null;
  const snippet = email.snippet;
  const inReplyTo =
    email.payload.headers.find((header) => header.name === "In-Reply-To")
      ?.value || null;
  const scheduleAt =
    email.payload.headers.find((header) => header.name === "Schedule-At")
      ?.value || null;
  const threadId = email.threadId;
  const messageId = email.id;
  const isRead = email.labelIds.includes("UNREAD") ? false : true;
  const createdAt = new Date(parseInt(email.internalDate)).toISOString();
  const isArch = email.labelIds.includes("ARCHIVE") ? true : false;
  const isTrashed = email.labelIds.includes("TRASH") ? true : false;

  const rows = await emailUseCases.getEmailByMessageId({
    messageId,
    databaseName: config.cockroach.dbName,
  });
  if (rows.length !== 0) {
    return rows;
  }
  if (inline) {
    bodyHtml = await emailUseCases.formatEmailBody({ bodyHtml, inline });
  }

  const emailId = await emailUseCases.createEmail({
    databaseName: config.cockroach.dbName,
    subject,
    bodyType,
    bodyText,
    bodyHtml,
    snippet,
    inReplyTo,
    scheduleAt,
    threadId,
    messageId,
    userId,
    isRead,
    createdAt,
    isArch,
    isTrashed,
    attachments,
    inline,
    accessToken,
  });
  const arrRecipients = await getAllRecipients({ formatEmail: parsedEmail });
  for (const recipient of arrRecipients) {
    const type = recipient?.type;
    const email = recipient?.email;
    await emailRecipientsUsecase.createRecipient({
      databaseName: config.cockroach.dbName,
      emailId: emailId[0].id,
      email,
      type,
    });
  }
  return emailId;
}
async function getAllRecipients({ formatEmail }) {
  const arrRecipients = [];
  const toEmails = formatEmail?.headers?.To?.split(",");
  const fromEmails = formatEmail?.headers?.From?.split(",");
  const ccEmails = formatEmail?.headers?.Cc?.split(",");
  const bccEmails = formatEmail?.headers?.Bcc?.split(",");
  if (toEmails && toEmails[0] !== "undisclosed-recipients:;") {
    const type = "TO";
    toEmails?.forEach((element) => {
      arrRecipients.push({
        type,
        email: element,
      });
    });
  }

  if (fromEmails) {
    const type = "FROM";
    fromEmails?.forEach((element) => {
      arrRecipients.push({
        type,
        email: element,
      });
    });
  }

  if (ccEmails) {
    const type = "CC";
    ccEmails?.forEach((element) => {
      arrRecipients.push({
        type,
        email: element,
      });
    });
  }

  if (bccEmails) {
    const type = "BCC";
    bccEmails?.forEach((element) => {
      arrRecipients.push({
        type,
        email: element,
      });
    });
  }
  return arrRecipients;
}

run().catch(console.error);