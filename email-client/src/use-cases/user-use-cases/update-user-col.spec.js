const updateUserColUseCase = require("./update-user-col");
const { ValidationError } = require("../../exceptions/validation.error");

describe("Update User Collection Use Case", () => {
  let updateUserCol;
  let userDbMock;

  beforeEach(() => {
    userDbMock = {
      updateUserCol: jest.fn(),
    };
    updateUserCol = updateUserColUseCase({
      Joi: require("joi"),
      ValidationError,
      userDb: userDbMock,
    });
  });

  it("should update the user collection and return the number of affected rows", async () => {
    const accessToken = "token123";
    const databaseName = "database";
    const id = 1;
    const affectedRows = 1;
    userDbMock.updateUserCol.mockResolvedValueOnce({ affectedRows });
    const result = await updateUserCol({ accessToken, databaseName, id });

    expect(userDbMock.updateUserCol).toHaveBeenCalledWith({
      accessToken,
      databaseName,
      id,
    });
    expect(result).toEqual(affectedRows);
  });

  it("should throw a ValidationError if any required input parameter is missing or invalid", async () => {
    const accessToken = null;
    const databaseName = "database";
    const id = 1;
    expect.assertions(3);
    try {
      await updateUserCol({ accessToken, databaseName, id });
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toContain("accessToken is required");
      expect(userDbMock.updateUserCol).not.toHaveBeenCalled();
    }
  });
});
