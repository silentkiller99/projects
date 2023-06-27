function getEmailAttachmentService({ axios, qs }) {
  return async function getEmailAttachment({ id, accessToken, messageId }) {
    console.log({
      id,
      accessToken,
      messageId,
    });
    const attachmentApiUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${id}`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.get(attachmentApiUrl, { headers });
    return response;
  };
}

module.exports = getEmailAttachmentService;
