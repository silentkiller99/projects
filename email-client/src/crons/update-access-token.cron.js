const CronJob = require("cron").CronJob;
const config = require("../config");
const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "EmailClint",
  brokers: config.kafka.brokerList,
});

const producer = kafka.producer();

const job = new CronJob("* 30 * * * *", function () {
  console.log("Cron job done!!!");
  sendMessage();
});
job.start();
async function sendMessage() {
  await producer.connect();
  await producer.send({
    topic: config.kafkaTopics.updateAccessToken,
    messages: [{ key: "Update Access Token", value: "" }],
  });
  await producer.disconnect();
}
