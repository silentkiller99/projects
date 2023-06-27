const { Given, When, Then, Before } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const NoDataFound = require("../../exceptions/no-data-found.error");
const ValidationError = require("../../exceptions/validation.error");
const makeGetFolderByName = require("./get-user-folder-by-name");

const folderDb = {
  getUserFolderByName: () => {},
};
const sandbox = sinon.createSandbox();

const getFolderByNameStub = sandbox.stub(folderDb, "getUserFolderByName");
getFolderByNameStub.callsFake((args) => {
  expect(args).deep.equal({
    userId: this.userId,
    name: this.name,
  });
  if (this.userId === 1)
    return {
      details:
        '"id": 1,"name": "siddhant","folderName": "sidmj","email": "siddhantmj2023@gmail.com","password": "siddhant123","createdAt": "2023-03-15T13:33:37.000Z","updatedAt": "2023-03-15T13:33:37.000Z"',
    };
  return [];
});

Before(() => {
  this.userId = undefined;
  this.name = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given("provide userId:{string} and name:{string} of folder", (userId, name) => {
  this.userId = parseInt(userId) || undefined;
  this.name = name;
});

When("try to get folder with userId and name", async () => {
  const getFolderByName = makeGetFolderByName({
    Joi,
    folderDb,
    ValidationError,
  });
  try {
    this.result = await getFolderByName({
      userId: this.userId,
      name: this.name,
    });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  "successfully get folder with that userId and name with message:{string}",
  (message) => {
    expect(this.result.details).deep.equal(message);
  }
);

Then(
  "It will throw error: {string} with message: {string} while geting folder with particular userId and name",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
