const config = require("../../config");
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "EmailClint",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const makeKafkaProducer = require("./producer");
const kafkaProducer = makeKafkaProducer({ producer });

module.exports = Object.freeze({ kafkaProducer });
