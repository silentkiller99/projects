const config = {
  mysql: {
    host: "127.0.0.1",
    hostForWebhook: "127.0.0.1",
    hostForReadWrite: "127.0.0.1",
    port: "3306",
    portForReadWrite: "3306",
    user: "siddhant.mazumdar",
    password: "Rapid@123",
    database: "EmailClint",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    poolSize: 10,
    debug: false,
    dbBackupEncryptionSecret: "eThAmZq4t2w!z%C*M-JaNdRfQjXn2r9u\n",
    genericDbName: "accounts_dev_salesmate_io",
  },
  cockroach: {
    host: "127.0.0.1",
    port: 26257,
    dbName: "email_clint_1",
    dbNameForStats: "salesmate_dev_stats",
    dbNameForDefaultValues: "salesmate_default_values_dev",
    dbNameForSubscription: "subscription_manager_dev",
    username: "root",
    password: "",
    poolSize: 10,
  },
  kafka: {
    host: "127.0.0.1",
    port: 9092,
    clintId: "EmailClint",
    brokerList: ["localhost:9092"],
  },

  //, "localhost:9094","localhost:9093"
  redis: {
    host: "127.0.0.1",
    port: "6379",
  },
  loggingOptions: {
    console: {
      enabled: true,
      level: "debug",
    },
  },
  caching: {
    enabled: "Y",
    server_type: "redis",
    options: {
      host: "127.0.0.1",
      port: "6379",
    },
  },
  subscription: {
    urlV1: "http://127.0.0.1:10029/subscription", // New subscription url
    token: "Q3hgrpS-5LUG50c099ca-170d-4531-b3fc-dd1df5b88470-Ypzu-xQ9dUaa", // Token for new subscription
    dbName: "subscription_manager",
    botUser: "7f70f08c-266d-44cc-94c1-2f0e3fa1597b",
  },
  kms: {
    keyRingId: "access-token",
    cryptoKeyId: "development",
    projectId: "salesmate-dev",
  },
  gcpStorage: {
    projectId: "salesmate-io",
    bucketName: "salesmate-dev",
    keyFilename: "gcp-service-account-key.json",
    audioBucket: "salesmate-development-voice-prompts",
    audioHost: "storage.cloud.google.com",
    gcpReportsFolderName: "reports/tmp/",
  },
  elastic: {
    url: "http://127.0.0.1:9200",
  },
  primaryMailServer: {
    host: "smtp.sendgrid.net",
    port: 2525,
    isSSL: true,
    username: "apikey",
    password:
      "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",
    debug: true,
  },
  secondaryMailServer: {
    host: "smtp.sendgrid.net",
    port: 2525,
    isSSL: true,
    username: "apikey",
    password:
      "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",
    debug: true,
  },
  primarySendgridAccount: {
    host: "smtp.sendgrid.net",
    port: 2525,
    isSSL: true,
    username: "apikey",
    password:
      "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",
    debug: true,
  },
  emailNotifications: {
    moduleObjectLink:
      "https://apps-dev.salesmate.io/client/{{host}}/module/{{moduleName}}/{{objectId}}",
    attachmentLink: "https://{{host}}/fe/emails/mailAttachments/{{path}}",
    imagesBasePath: "https://{{host}}/assets/images/emails",
  },
  botUserId: 999999,
  recaptcha: {
    secretKey: "6LewNpsUAAAAAKO2EgevJADgED8PPt1WdNpFHtYt",
  },
  key: {
    googleClintId:
      "682389617009-mpm3fc1g33qid7ce0f3eum68kt5h16ri.apps.googleusercontent.com",
    googleClientSecret: "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",
    googleOauthRedirectUrl: "http://localhost:5000/auth/google",
    googleApiKey: "AIzaSyDRDO3tPJuj-uR-SVbdcal-Tve1-qFg0p8",
  },
  officeIps: ["120.72.91.58", "103.112.218.218"],
};
module.exports = config;
