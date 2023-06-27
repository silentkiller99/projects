const { Given, When, Then, Before } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");
const ValidationError = require("../../exceptions/validation.error");
const makeCreateFolder = require("./create-folder");

const sandbox = sinon.createSandbox();

const folderDb = {
  createFolder: () => {},
};

const createFolderStub = sandbox.stub(folderDb, "createFolder");
createFolderStub.callsFake((args) => {
  expect(args).deep.equal({
    userId: this.userId,
    name: this.name,
    providerId: this.providerId,
  });
  if (this.userId === 1) return "done";
  return;
});
Before(() => {
  this.name = undefined;
  this.userId = undefined;
  this.providerId = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  'folder details name: {string}, userId: {string}, and providerId: {string} to create new folder',
  (name, userId,providerId) => {
    this.name = name || undefined;
    this.userId = parseInt(userId) || undefined;
    this.providerId = parseInt(providerId) || undefined;
  });

  When("I create a new folder", async () => {
  const createFolder = makeCreateFolder({
    Joi,
    folderDb,
    ValidationError,
  });
  try {
    this.result = await createFolder({
    userId: this.userId,
    name: this.name,
    providerId: this.providerId,
    });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
  });


Then('It will create new folder with message: {string}', (message) => {
  expect(this.result).deep.equal(message);
});

Then(
  "createfolder function will call {int} time while creating new folder",
  (createfolderFunctionCallCount) => {
    sinon.assert.callCount(createFolderStub, createfolderFunctionCallCount);
  }
);

Then(
  'It will throw error: {string} with message: {string} while creating new folder',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);