const makeGetGoogleUser = require("../src/get-google-user");
const { expect } = require("chai");
const sinon = require("sinon");
const Joi = require("joi");
const ValidationError = require("../src/errors/validation-error");

describe("get-google-user", () => {
  let sandbox;
  let getGoogleUser;
  let authServicesMock;
  const validAccessToken = "validAccessToken";
  const validIdToken = "validIdToken";

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    authServicesMock = {
      googleUser: sandbox.stub(),
    };
    getGoogleUser = makeGetGoogleUser({
      Joi,
      ValidationError,
      authServices: authServicesMock,
    });
  });

  afterEach(() => {
    sandbox.restore();
  });
  describe("when provided with valid access token and id token", () => {
    beforeEach(() => {
      authServicesMock.googleUser.resolves({ name: "test-user" });
    });
    it("should return the user information", async () => {
      const result = await getGoogleUser({
        accessToken: validAccessToken,
        idToken: validIdToken,
      });
      expect(result).to.deep.equal({ name: "test-user" });
    });
  });

  describe("when provided with invalid input", () => {
    it("should throw a validation error for missing access token", async () => {
      try {
        await getGoogleUser({
          idToken: validIdToken,
        });
      } catch (error) {
        expect(error).to.be.an.instanceOf(ValidationError);
        expect(error.message).to.equal('"accessToken" is required');
      }
    });
    it("should throw a validation error for missing id token", async () => {
      try {
        await getGoogleUser({
          accessToken: validAccessToken,
        });
      } catch (error) {
        expect(error).to.be.an.instanceOf(ValidationError);
        expect(error.message).to.equal('"idToken" is required');
      }
    });
  });

  describe("when an error occurs while getting Google User details", () => {
    const errorMessage = "Error while getting user details";
    beforeEach(() => {
      authServicesMock.googleUser.rejects(new Error(errorMessage));
    });
    it("should throw an error", async () => {
      try {
        await getGoogleUser({
          accessToken: validAccessToken,
          idToken: validIdToken,
        });
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal(errorMessage);
      }
    });
  });
});
