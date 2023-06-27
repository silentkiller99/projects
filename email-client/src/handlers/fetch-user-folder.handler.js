const { folderUseCases } = require("../use-cases");
const { Kafka } = require("kafkajs");
const config = require("../config");

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokerList,
});
const consumer = kafka.consumer({ groupId: "UserCreated" });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({
    topic: config.kafkaTopics.userCreated,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({ topic, partition });
      await main({
        id: message.key.toString(),
        accessToken: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);

async function main({ id, accessToken }) {
  const labels = await folderUseCases.fetchUserFolders({ accessToken });
  // Sort the labels based on the order of INBOX, SENT, IMPORTANT, and STARRED
  labels.sort((a, b) => {
    const labelOrder = { INBOX: 1, SENT: 2, IMPORTANT: 3, STARRED: 4 };
    return (labelOrder[a.name] || Infinity) - (labelOrder[b.name] || Infinity);
  });

  for (let index = 0; index < labels.length; index++) {
    const label = labels[index];
    await folderUseCases.createFolder({
      userId: id,
      name: label.name,
      providerId: label.id,
      databaseName: config.cockroach.dbName,
      type: label.type,
      accessToken,
    });
  }
}