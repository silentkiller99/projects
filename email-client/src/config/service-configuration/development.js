const config = {
  serviceName: "Sample Service",
  kafkaTopics: {
    updateAccessToken: "UpdateAccessToken",
    userCreated: "userCreated",
    folderCreated: "folderCreated",
    emailCreated: "emailCreated",
  },

  serviceEndpointPrefix: "/sample-service",
};
module.exports = config;
