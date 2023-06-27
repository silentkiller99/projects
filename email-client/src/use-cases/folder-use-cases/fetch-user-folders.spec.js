const makeFetchUserFolders = require("./fetch-user-folders");
const { ValidationError } = require("../../exceptions/validation.error");

describe("Fetch User Folders", () => {
  let fetchUserFolders;
  let getUserFoldersMock;

  beforeEach(() => {
    getUserFoldersMock = jest.fn();
    fetchUserFolders = makeFetchUserFolders({
      getUserFolders: getUserFoldersMock,
    });
  });

  it("should fetch the user's folders", async () => {
    const accessToken = "token123";
    const folders = ["folder1", "folder2"];
    getUserFoldersMock.mockResolvedValueOnce(folders);
    const result = await fetchUserFolders({ accessToken });

    expect(getUserFoldersMock).toHaveBeenCalledWith(accessToken);
    expect(result).toEqual(folders);
  });

  it("should throw an UnauthorizedError if the access token is invalid", async () => {
    const accessToken = "invalidToken";
    getUserFoldersMock.mockRejectedValueOnce(new UnauthorizedError());
    expect.assertions(3);
    try {
      await fetchUserFolders({ accessToken });
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error.message).toContain("Unauthorized");
      expect(getUserFoldersMock).toHaveBeenCalledWith(accessToken);
    }
  });

  it("should throw a ValidationError if the access token is missing", async () => {
    const accessToken = null;
    expect.assertions(3);
    try {
      await fetchUserFolders({ accessToken });
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toContain("Access token is required");
      expect(getUserFoldersMock).not.toHaveBeenCalled();
    }
  });
});
