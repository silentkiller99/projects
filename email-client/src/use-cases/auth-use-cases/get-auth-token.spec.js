const makeGetAuthToken = require("./get-auth-token");

describe("Get Auth Token", () => {
  let getAuthToken;
  let authServices;

  beforeEach(() => {
    authServices = {
      authToken: jest.fn(),
    };

    getAuthToken = makeGetAuthToken({
      Joi: require("joi"),
      ValidationError: class extends Error {},
      authServices,
    });
  });

  describe("Successful scenario", () => {
    beforeEach(() => {
      authServices.authToken.mockReturnValue({ authToken: "validAuthToken" });
    });
    it("returns the new authentication token", async () => {
      const result = await getAuthToken({ code: "validCode" });

      expect(result).toEqual({ authToken: "validAuthToken" });
    });
  });

  describe("Invalid input scenario", () => {
    it("throws a validation error if code is not provided", async () => {
      await expect(getAuthToken({})).rejects.toThrow("code is required");
    });
    it("throws a validation error if code is not a string", async () => {
      await expect(getAuthToken({ code: 123 })).rejects.toThrow(
        "code must be a string"
      );
    });
  });

  describe("Error fetching auth token scenario", () => {
    beforeEach(() => {
      authServices.authToken.mockRejectedValue(
        new Error("Error fetching auth token")
      );
    });
    it("throws an error if an error occurs when fetching the auth token", async () => {
      await expect(getAuthToken({ code: "validCode" })).rejects.toThrow(
        "Error fetching auth token"
      );
    });
  });
});
