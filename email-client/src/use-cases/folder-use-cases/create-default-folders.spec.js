const { Given, When, Then, Before } = require("cucumber");
const chai = require("chai");
const sinon = require("sinon");
const makeCreateDefaultFolder = require("./create-default-folders");
const ValidationError = require("../../exceptions/validation.error");
const Joi = require("joi");
const lodash = require("lodash");

const { expect } = chai;
const mockFun = {
  createFolder: () => {},
};

const sandbox = sinon.createSandbox();

const createFolderStub = sandbox.stub(mockFun, "createFolder");
createFolderStub.callsFake((args) => {
  console.log(args);
  //   expect(args).deep.equal({
  //     name: this.name,
  //     userId: this.userId,
  //     providerId: this.providerId,
  //   });
  return "done";
});
Before(() => {
  this.userId = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given("provide userId: {string}", (userId) => {
  this.userId = parseInt(userId) || undefined;
});

When("i try to create default folders", async () => {
  const createDefaultFolders = makeCreateDefaultFolder({
    Joi,
    lodash,
    createFolder: mockFun.createFolder,
    ValidationError,
  });
  try {
    this.result = await createDefaultFolders({ userId: this.userId });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  "the default folders are created successfully with message:{string}",
  (message) => {
    expect(this.result).deep.equal(message);
  }
);

Then("an error:{string} message:{string} is returned", (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});
