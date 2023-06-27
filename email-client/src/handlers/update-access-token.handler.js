const { userUseCases, authUseCases } = require("../use-cases");
const { Kafka } = require("kafkajs");
const config = require("../config");

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokerList,
});
const consumer = kafka.consumer({ groupId: "userCreated" });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({
    topic: config.kafkaTopics.updateAccessToken,
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
      main();
    },
  });
};

run().catch(console.error);

async function main() {
  console.log("Job started");
  const userIdList = await userUseCases.getAllUser({
    databaseName: config.cockroach.dbName,
    column: "id",
  });

  if (userIdList.length === 0) {
    console.log("User ID list is empty.");
    return;
  }
for (let index = 0; index < userIdList.length; index++) {
  const userId = userIdList[index].id;
  const result = await userUseCases.getUser({
    column: "refresh_token",
    id: userId,
    databaseName: config.cockroach.dbName,
  });

  if (!result) {
    console.log("Refresh token is null or undefined.");
    return;
  }
  const refreshToken = result[index].refresh_token;
  let accessToken = await authUseCases.getAccessToken({ refreshToken });
  const columnsToUpdate = {
    access_token: accessToken,
    // Add more columns here as needed
  };
  const res = await userUseCases.updateUser({
    columns: columnsToUpdate,
    id: userId,
    databaseName: config.cockroach.dbName,
  });
}
  console.log("Job done");
}
