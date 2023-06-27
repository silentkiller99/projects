const { Given, When, Then, Before } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const ValidationError = require("../../exceptions/validation.error");
const NoDataFound = require("../../exceptions/no-data-found.error");
const makeDeleteUser = require("./delete-user");

const userDb = {
  deleteUser: () => {},
};
const sandbox = sinon.createSandbox();

const deleteUserStub = sandbox.stub(userDb, "deleteUser");
deleteUserStub.callsFake((args) => {
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
Given("provide invalid user id : {string} to delete user", (id) => {
  this.id = id || undefined;
});

Given("provide user id : {int} to delete user", (id) => {
  this.id = id || undefined;
});

When("try to delete user", async () => {
  const deleteUser = makeDeleteUser({
    Joi,
    userDb,
    ValidationError,
    NoDataFound,
  });
  try {
    this.result = await deleteUser({
      id: this.id,
    });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then("user successfully deleted with message:{string}", (message) => {
  console.log(message);
  expect(this.result).deep.equal(message);
});

Then(
  "It will throw error: {string} with message: {string} while deleting new user",
  (error, message) => {
    console.log(error, message);
    console.log(this.error);
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
