function getGoogleUser({ axios }) {
  return async function googleUser({ idToken, accessToken }) {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error, "Error fetching Google user");
      throw new Error(error.message);
    }
  };
}

module.exports = getGoogleUser;
