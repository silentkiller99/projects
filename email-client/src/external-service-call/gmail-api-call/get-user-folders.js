function getUserFoldersService({ axios }) {
  return async function getUserFolders({ accessToken }) {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/gmail/v1/users/me/labels",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.data.labels) {
        throw new Error("Failed to fetch labels from Gmail API");
      }

      return response.data.labels;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Invalid access token:", error.message);
        throw new Error("Invalid access token");
      } else {
        console.error(error);
        throw error;
      }
    }
  };
}

module.exports = getUserFoldersService;
