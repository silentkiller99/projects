const { Kafka } = require("kafkajs");
const path = require("path");
const { attachmentUseCases, emailUseCases } = require("../use-cases");
const config = require("../config");

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokerList,
});
const consumer = kafka.consumer({ groupId: "emailCreated" });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({
    topic: config.kafkaTopics.emailCreated,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({ topic, partition });
            const messageId = message.key?.toString();
            const value = JSON.parse(message.value);
            const attachments = value.attachments;
            const accessToken = value.accessToken?.toString();
            const rows = await emailUseCases.getEmailByMessageId({
              messageId,
              databaseName: config.cockroach.dbName,
            });
      const emailId = rows[0].id;
      await main({ attachments, messageId, accessToken, emailId });
    },
  });
};
run().catch(console.error);

async function main({ attachments, messageId, accessToken, emailId }) {
  attachments.forEach(async (attachment) => {
    const rows = await attachmentUseCases.fetchEmailAttachments({
      id: attachment.attachmentId,
      accessToken,
      messageId,
    });
    // using fs write data in file
    const data = rows.data.data;
    await attachmentUseCases.writeAttachmentFile({
      data,
      fileName: attachment.filename,
    });

    const filePath = path.join("public", attachment.filename);
    const id = await attachmentUseCases.createAttachment({
      databaseName: config.cockroach.dbName,
      emailId,
      fileName: attachment.filename,
      fileType: attachment.mimeType,
      fileSize: attachment.size,
      filePath,
    });
  });
}
