module.exports = function makeCreateEmail({
  Joi,
  ValidationError,
  emaildb,
  kafkaProducer,
  config,
}) {
  return async function createEmail({
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
    databaseName,
    inline,
    attachments,
    accessToken,
  }) {
    // validateInput({
    //   subject,
    //   bodyType,
    //   body,
    //   snippet,
    //   inReplyTo,
    //   scheduleAt,
    //   threadId,
    //   messageId,
    //   userId,
    //   isRead,
    //   createdAt,
    //   isArch,
    //   isTrashed,
    //   databaseName,
    // });
    const emailId = await emaildb.createEmail({
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
      databaseName,
    });
    //produceres msg email created for fetching email attachment,store recipent,and email folder relationship
    if (inline) {
      await kafkaProducer({
        topic: config.kafkaTopics.emailCreated,
        messages: [
          { key: messageId?.toString(), value: JSON.stringify(inline) },
        ],
      });
    }
    if (attachments) {
      await kafkaProducer({
        topic: config.kafkaTopics.emailCreated,
        messages: [
          {
            key: messageId?.toString(),
            value: JSON.stringify({
              attachments,
              accessToken: accessToken?.toString(),
            }),
          },
        ],
      });
    }

    return emailId;
  };
  function validateInput({
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
    databaseName,
    inline,
    attachments,
  }) {
    const schema = Joi.object({
      subject: Joi.string().min(1).max(255).allow(null),
      bodyType: Joi.string().valid("text", "html").required(),
      bodyText: Joi.string().min(1).max(10000).allow(null),
      bodyHtml: Joi.string().min(1).max(10000).allow(null),
      snippet: Joi.string().max(1000).allow(null),
      inReplyTo: Joi.string().max(255).allow(null),
      scheduleAt: Joi.date().iso().allow(null),
      threadId: Joi.string().max(255).required(),
      messageId: Joi.string().max(255).required(),
      userId: Joi.string().max(255).required(),
      isRead: Joi.boolean().required(),
      createdAt: Joi.date().iso().required(),
      isArch: Joi.boolean().required(),
      isTrashed: Joi.boolean().required(),
      databaseName: Joi.string().min(2).max(20).required(),
      inline: Joi.object().allow(null),
      attachments: Joi.object().allow(null),
    });

    const { error } = schema.validate({
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
      databaseName,
      inline,
      attachments,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
