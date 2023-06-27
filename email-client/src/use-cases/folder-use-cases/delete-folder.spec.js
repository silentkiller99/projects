const { Given, When, Then, Before } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const ValidationError = require("../../exceptions/validation.error");
const NoDataFound = require("../../exceptions/no-data-found.error");
const makeDeleteFolder = require("./delete-folder");

const folderDb = {
  deleteFolder: () => {},
};
const sandbox = sinon.createSandbox();

const deletefolderStub = sandbox.stub(folderDb, "deleteFolder");
deletefolderStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
  });
  if (this.id === 1) return { affectedRows: 1 };
  return { affectedRows: 0 };
});
Before(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});
Given("provide invalid folder id : {string} to delete folder", (id) => {
  this.id = id || undefined;
});

Given("provide folder id : {int} to delete folder", (id) => {
  this.id = id || undefined;
});

When("try to delete folder", async () => {
  const deleteFolder = makeDeleteFolder({
    Joi,
    folderDb,
    ValidationError,
    NoDataFound,
  });
  try {
    this.result = await deleteFolder({
      id: this.id,
    });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then("folder successfully deleted with message:{string}", (message) => {
  expect(this.result).deep.equal(message);
});

Then(
  "It will throw error: {string} with message: {string} while deleting folder",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
