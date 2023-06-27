function makeGetAccessToken({ axios, qs, key }) {
  return async function getAccessToken({ refreshToken }) {
    try {
      const accessTokenObj = await axios.post(
        "https://www.googleapis.com/oauth2/v4/token",
        qs.stringify({
          refresh_token: refreshToken,
          client_id: key.googleClintId,
          client_secret: key.googleClientSecret,
          grant_type: "refresh_token",
        })
      );
      return accessTokenObj.data.access_token;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}

module.exports = makeGetAccessToken;
