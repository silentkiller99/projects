const { Given, When, Then, Before } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const ValidationError = require("../../exceptions/validation.error");
const makeGetUserByEmail = require("./get-user-by-email");

const userDb = {
  getUserByEmail: () => {},
};
const sandbox = sinon.createSandbox();

const getUserByEmailStub = sandbox.stub(userDb, "getUserByEmail");
getUserByEmailStub.callsFake((args) => {
  expect(args).deep.equal({
    email: this.email,
  });
  if (this.email === "siddhantmazumdar@gmail.com")
    return {
      details:
        '"id": 1,"name": "siddhant","userName": "sidmj","email": "siddhantmj2023@gmail.com","password": "siddhant123","createdAt": "2023-03-15T13:33:37.000Z","updatedAt": "2023-03-15T13:33:37.000Z"',
    };
  return [];
});
Before(() => {
  this.email = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given("provide email:{string}", (email) => {
  this.email = email || undefined;
});

When("try to get user with particular email", async () => {
  const getUserByEmail = makeGetUserByEmail({ Joi, userDb, ValidationError });
  try {
    this.result = await getUserByEmail({ email: this.email });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  "successfully get user with that email with message:{string}",
  (message) => {
    expect(this.result.details).deep.equal(message);
  }
);

Then(
  "It will throw error: {string} with message: {string} while geting user with particular email",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
