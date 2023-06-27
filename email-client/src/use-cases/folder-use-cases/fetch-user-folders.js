module.exports = function makeFetchUserFolders({
  Joi,
  ValidationError,
  NoDataFound,
  getUserFolders,
}) {
  return async function fetchUserFolders({ accessToken }) {
    validateInput({ accessToken });
    //calls external service for fetching folder list
    const folderList = await getUserFolders({ accessToken });

    if (folderList.length === 0) throw new NoDataFound("no folder found!");
    return folderList;
  };
  function validateInput({ accessToken }) {
    const fetchUserFolderSchema = Joi.object({
      accessToken: Joi.string().required(),
    });
    const { error } = fetchUserFolderSchema.validate({
      accessToken,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
