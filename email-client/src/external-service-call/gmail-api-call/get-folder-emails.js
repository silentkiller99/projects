function getFolderEmailsService({ axios, qs }) {
  return async function getFolderEmails({ id, accessToken, nextPageToken }) {
    const pastDate = new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    let apiUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10&q=label:${id}&format=full after:${pastDate}`;
    if (nextPageToken) {
      apiUrl += `&pageToken=${nextPageToken}`;
    }
    const headers = { Authorization: `Bearer ${accessToken}` };
    const emailList = await axios.get(apiUrl, { headers });
    const messages = emailList.data.messages;
    if (!messages || messages.length === 0) {
      console.log("No messages to fetch");
      return [];
    } else {
      const emails = [];
      for (let index = 0; index < messages.length; index++) {
        const messageId = messages[index]?.id;
        const messageApiUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`;
        const email = await axios.get(messageApiUrl, { headers });
        emails.push(email.data);
      }
      //calls gmail api and fetches email list and return to use case
      return { emails, newNextPageToken: emailList.data.nextPageToken };
    }
  };
}
module.exports = getFolderEmailsService;
