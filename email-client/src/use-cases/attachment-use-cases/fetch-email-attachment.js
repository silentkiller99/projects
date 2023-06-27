module.exports = function makeFetchEmailAttachments({
  Joi,
  ValidationError,
  getEmailAttachment,
}) {
  return async function fetchEmailAttachments({ id, accessToken, messageId }) {
    const result = getEmailAttachment({ id, accessToken, messageId });
    return result;
  };
  function validateInput({ id, messageId, accessToken }) {
    //Joi implementation
  }
};
