const { Kafka } = require("kafkajs");
const { folderUseCases } = require("../use-cases");
const kafka = new Kafka({
  clientId: "EmailClint",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "CreateDefaultFolder" });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({
    topic: "CreateDefaultFolder",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        key: message.key.toString(),
        value: message.value.toString(),
      });
      folderUseCases.createDefaultFolders({
        userId: parseInt(message?.value?.toString()),
        databaseName: message?.key?.toString(),
      });
    },
  });
};

run().catch(console.error);
