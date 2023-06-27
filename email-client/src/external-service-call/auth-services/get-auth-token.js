function getAuthAccessToken({ axios, qs }) {
  return async function authAccessToken({ code }) {
    const url = "https://oauth2.googleapis.com/token";

    const values = {
      code,
      client_id:
        "682389617009-mpm3fc1g33qid7ce0f3eum68kt5h16ri.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uri: "http://localhost:5000/auth/google",
      grant_type: "authorization_code",
    };

    try {
      const res = await axios.post(url, qs.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
}
module.exports = getAuthAccessToken;
