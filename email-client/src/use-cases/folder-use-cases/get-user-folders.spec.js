const { Given, When, Then, Before } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const NoDataFound = require("../../exceptions/no-data-found.error");
const ValidationError = require("../../exceptions/validation.error");
const makeGetFolder = require("./get-user-folders");

const folderDb = {
  getUserFolders: () => {},
};
const sandbox = sinon.createSandbox();

const getFolderStub = sandbox.stub(folderDb, "getUserFolders");
getFolderStub.callsFake((args) => {
  expect(args).deep.equal({
    userId: this.userId,
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
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given("provide userId:{string} of folders", (userId) => {
  this.userId = parseInt(userId) || undefined;
});

When("try to get folders with userId", async () => {
  const getFolder = makeGetFolder({ Joi, folderDb, ValidationError });
  try {
    this.result = await getFolder({ userId: this.userId });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then("successfully get folders with that userId with message:{string}", (message) => {
  expect(this.result.details).deep.equal(message);
});

Then(
  "It will throw error: {string} with message: {string} while geting folders with particular userId",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
