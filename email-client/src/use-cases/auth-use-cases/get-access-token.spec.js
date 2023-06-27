const makeGetAccessToken = require("./get-access-token");

describe("Get Access Token", () => {
  let getAccessToken;
  let authServices;

  beforeEach(() => {
    authServices = {
      getAccessToken: jest.fn(),
    };
    getAccessToken = makeGetAccessToken({
      Joi: require("joi"),
      ValidationError: class extends Error {},
      authServices,
    });
  });

  describe("Successful scenario", () => {
    beforeEach(() => {
      authServices.getAccessToken.mockReturnValue({
        accessToken: "validAccessToken",
      });
    });
    it("returns the new access token", async () => {
      const result = await getAccessToken({
        refreshToken: "validRefreshToken",
      });

      expect(result).toEqual({ accessToken: "validAccessToken" });
    });
  });

  describe("Invalid input scenario", () => {
    it("throws a validation error if refresh token is not provided", async () => {
      await expect(getAccessToken({})).rejects.toThrow(
        "refreshToken is required"
      );
    });
    it("throws a validation error if refresh token is not a string", async () => {
      await expect(getAccessToken({ refreshToken: 123 })).rejects.toThrow(
        "refreshToken must be a string"
      );
    });
  });

  describe("Error fetching access token scenario", () => {
    beforeEach(() => {
      authServices.getAccessToken.mockRejectedValue(
        new Error("Error fetching access token")
      );
    });
    it("throws an error if an error occurs when fetching the access token", async () => {
      await expect(
        getAccessToken({ refreshToken: "validRefreshToken" })
      ).rejects.toThrow("Error fetching access token");
    });
  });
});
