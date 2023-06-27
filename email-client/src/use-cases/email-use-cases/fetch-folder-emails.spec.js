const makeFetchFolderEmails = require("./fetch-folder-emails");

describe("Fetch Folder Emails", () => {
  let fetchFolderEmails;
  let getFolderEmails;

  beforeEach(() => {
    getFolderEmails = jest.fn();
    fetchFolderEmails = makeFetchFolderEmails({
      Joi: require("joi"),
      ValidationError: class extends Error {},
      NoDataFound: class extends Error {},
      getFolderEmails,
    });
  });

  describe("Successful scenario", () => {
    beforeEach(() => {
      getFolderEmails.mockReturnValue([
        { subject: "Email 1" },
        { subject: "Email 2" },
      ]);
    });
    it("returns the list of emails", async () => {
      const result = await fetchFolderEmails({
        id: "folderId",
        accessToken: "validToken",
      });

      expect(result).toEqual([{ subject: "Email 1" }, { subject: "Email 2" }]);
    });
  });

  describe("Invalid input scenario", () => {
    it("throws a validation error if folder ID is not provided", async () => {
      await expect(
        fetchFolderEmails({ accessToken: "validToken" })
      ).rejects.toThrow("id is required");
    });

    it("throws a validation error if access token is not provided", async () => {
      await expect(fetchFolderEmails({ id: "folderId" })).rejects.toThrow(
        "accessToken is required"
      );
    });
  });

  describe("No data found scenario", () => {
    beforeEach(() => {
      getFolderEmails.mockReturnValue([]);
    });
    it("throws a NoDataFound error if no emails are found in the folder", async () => {
      await expect(
        fetchFolderEmails({ id: "folderId", accessToken: "validToken" })
      ).rejects.toThrow("no emails found in folder");
    });
  });
});
