const { Given, When, Then, Before } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const NoDataFound = require("../../exceptions/no-data-found.error");
const ValidationError = require("../../exceptions/validation.error");
const makeGetFolder = require("./get-user-folder");

const folderDb = {
  getUserFolder: () => {},
};
const sandbox = sinon.createSandbox();

const getFolderStub = sandbox.stub(folderDb, "getUserFolder");
getFolderStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
  });
  if (this.id === 1)
    return {
      details:
        '"id": 1,"name": "siddhant","folderName": "sidmj","email": "siddhantmj2023@gmail.com","password": "siddhant123","createdAt": "2023-03-15T13:33:37.000Z","updatedAt": "2023-03-15T13:33:37.000Z"',
    };
  return [];
});

Before(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given("provide id:{string} of folder", (id) => {
  this.id = parseInt(id) || undefined;
});

When("try to get folder with particular id", async () => {
  const getFolder = makeGetFolder({ Joi, folderDb, ValidationError });
  try {
    this.result = await getFolder({ id: this.id });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then("successfully get folder with that id with message:{string}", (message) => {
  expect(this.result.details).deep.equal(message);
});

Then(
  "It will throw error: {string} with message: {string} while geting folder with particular id",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
