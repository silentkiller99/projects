const { Given, When, Then, Before } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const ValidationError = require("../../exceptions/validation.error");
const makeGetUser = require("./get-user");

const userDb = {
  getUser: () => {},
};
const sandbox = sinon.createSandbox();

const getUserStub = sandbox.stub(userDb, "getUser");
getUserStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
  });
  if (this.id === 1)
    return {
      details:
        '"id": 1,"name": "siddhant","userName": "sidmj","email": "siddhantmj2023@gmail.com","password": "siddhant123","createdAt": "2023-03-15T13:33:37.000Z","updatedAt": "2023-03-15T13:33:37.000Z"',
    };
  return [];
});

Before(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given("provide id:{int} of user", (id) => {
  this.id = id || undefined;
});

Given("provide id:{string} of user", (id) => {
  this.id = id || undefined;
});

When("try to get user with particular id", async () => {
  const getUser = makeGetUser({ Joi, userDb, ValidationError });
  try {
    this.result = await getUser({ id: this.id });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then("successfully get user with that id with message:{string}", (message) => {
  console.log(this.result);
  expect(this.result.details).deep.equal(message);
});

Then(
  "It will throw error: {string} with message: {string} while geting user with particular id",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
