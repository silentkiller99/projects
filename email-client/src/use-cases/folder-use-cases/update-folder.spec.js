const { Given, When, Then, Before } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");
const ValidationError = require("../../exceptions/validation.error");
const makeUpdateFolder = require("./update-folder");

const sandbox = sinon.createSandbox();

const folderDb = {
  updateFolder: () => {},
};

const updateFolderStub = sandbox.stub(folderDb, "updateFolder");
updateFolderStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
    name: this.name,
  });
  if (this.id === 1) return {affectedRows: 1};
  return;
});
Before(() => {
  this.name = undefined;
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  'folder details name: {string}, id: {string} to update folder',
  (name, id) => {
    this.name = name || undefined;
      this.id = parseInt(id) || undefined;
  });

  When("I update a folder", async () => {
  const updateFolder = makeUpdateFolder({
    Joi,
    folderDb,
    ValidationError,
  });
  try {
    this.result = await updateFolder({
    id: this.id,
    name: this.name,
	});
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
  });


Then('It will update folder with message: {string}', (message) => {
  expect(this.result).deep.equal(JSON.parse(message).affectedRows);
});

Then(
  "updatefolder function will call {int} time while updating folder",
  (updatefolderFunctionCallCount) => {
    sinon.assert.callCount(updateFolderStub, updatefolderFunctionCallCount);
  }
);

Then(
  'It will throw error: {string} with message: {string} while updating folder',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);