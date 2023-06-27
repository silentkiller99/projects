module.exports = function makeKafkaProducer({ producer }) {
  return async function kafkaProducer({ messages, topic }) {
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: messages,
      // numPartitions: 3, // set number of partitions
      // replicationFactor: 3, // set replication factor
    });
    await producer.disconnect();
    return;
  };
};
