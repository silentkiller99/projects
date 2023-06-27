module.exports = function makeFetchFolderEmails({
  Joi,
  ValidationError,
  NoDataFound,
  getFolderEmails,
}) {
  return async function fetchFolderEmails({ id, accessToken, nextPageToken }) {
    validateInput({ id, accessToken, nextPageToken });
    // calls external service provider to fetch emails in folder
    const { emails, newNextPageToken } = await getFolderEmails({
      id,
      accessToken,
      nextPageToken,
    });

    // if (emails.length === 0) throw new NoDataFound("no email found!");
    return { emails, newNextPageToken };
  };
  function validateInput({ accessToken, id, nextPageToken }) {
    const fetchUserFolderSchema = Joi.object({
      accessToken: Joi.string().required(),
      id: Joi.string().required(),
      nextPageToken: Joi.string().allow(null),
    });
    const { error } = fetchUserFolderSchema.validate({
      accessToken,
      id,
      nextPageToken,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
