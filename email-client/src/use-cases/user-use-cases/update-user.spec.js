const { Given, When, Then, Before } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");
const ValidationError = require("../../exceptions/validation.error");
const makeUpdateUser = require("./update-user");

const sandbox = sinon.createSandbox();

const userDb = {
  updateUser: () => {},
};

const updateUserStub = sandbox.stub(userDb, "updateUser");
updateUserStub.callsFake((args) => {
  expect(args).deep.equal({
    name: this.name,
    userName: this.userName,
    password: this.password,
    id: this.id,
  });

  return { affectedRows: 1 };
});

Before(() => {
  this.name = undefined;
  this.userName = undefined;
  this.password = undefined;
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "User details name: {string}, userName: {string},  and password: {string} to update user details using id:{int}",
  (name, userName, password, id) => {
    this.name = name || undefined;
    this.userName = userName || undefined;
    this.password = password || undefined;
    this.id = id || undefined;
  }
);

When("I update user details", async () => {
  const updateUser = makeUpdateUser({
    Joi,
    userDb,
    ValidationError,
  });
  try {
    this.result = await updateUser({
      name: this.name,
      userName: this.userName,
      password: this.password,
      id: this.id,
    });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then("It will update user with message: {string}", (affectedRowsDetails) => {
  expect(this.result).deep.equal(JSON.parse(affectedRowsDetails).affectedRows);
});

Then(
  "It will throw error: {string} with message: {string} while updatinging user details",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
