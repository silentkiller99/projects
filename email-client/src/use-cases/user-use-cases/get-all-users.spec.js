const { Given, When, Then, Before } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;

const NoDataFound = require("../../exceptions/no-data-found.error");
const makeGetAllUser = require("./get-all-users");

const userDb = {
  getUsers: () => {},
};
const sandbox = sinon.createSandbox();

const getUsersStub = sandbox.stub(userDb, "getUsers");
getUsersStub.onCall(0).returns({
  details:
    '"id": 1,"name": "siddhant","userName": "sidmj","email": "siddhantmj2023@gmail.com","password": "siddhant123","createdAt": "2023-03-15T13:33:37.000Z","updatedAt": "2023-03-15T13:33:37.000Z"',
});
getUsersStub.callsFake(() => {
  return [];
});

Given("just call the Function get all users", () => {});

When("try to get all users", async () => {
  const getAllUser = makeGetAllUser({ userDb, NoDataFound });
  try {
    this.result = await getAllUser();
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then("successfully get all users with message:{string}", (message) => {
  expect(this.result.details).deep.equal(message);
});

Then(
  "It will throw error: {string} with message: {string} while geting all user",
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
