const { Given, When, Then, Before } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");
const ValidationError = require("../../exceptions/validation.error");
const makeCreateUser = require("./create-user");

const sandbox = sinon.createSandbox();

const userDb = {
  createUser: () => {},
};

const createUserStub = sandbox.stub(userDb, "createUser");
createUserStub.callsFake((args) => {
  expect(args).deep.equal({
    name: this.name,
    userName: this.userName,
    email: this.email,
    password: this.password,
  });

  return { insertId: 1 };
});
Before(() => {
  this.name = undefined;
  this.userName = undefined;
  this.email = undefined;
  this.password = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});
Given(
  "User details name: {string}, userName: {string}, email: {string}, and password: {string} to create new user",
  (name, userName, email, password) => {
    this.name = name || undefined;
    this.userName = userName || undefined;
    this.email = email || undefined;
    this.password = password || undefined;
  }
);

When("I create a new user", async () => {
  const createUser = makeCreateUser({
    Joi,
    userDb,
    ValidationError,
  });
  try {
    this.result = await createUser({
      name: this.name,
      userName: this.userName,
      email: this.email,
      password: this.password,
    });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then('It will create new user with details: "{string}"', (newUserDetails) => {
  expect(this.result).deep.equal(JSON.parse(newUserDetails).insertId);
});

Then(
  "createUser function will call {int} time while creating new user",
  (createUserFunctionCallCount) => {
    sinon.assert.callCount(createUserStub, createUserFunctionCallCount);
  }
);

Then(
  "It will throw error: {string} with message: {string} while creating new user",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
