const { userDb } = require("../../data-access");
const ValidationError = require("../../exceptions/validation.error");
const NoDataFound = require("../../exceptions/no-data-found.error");
const Joi = require("joi");
const config = require("../../config");
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "EmailClint",
  brokers: config.kafka.brokerList,
});

const producer = kafka.producer();

const makeCreateUser = require("./create-user");
const makeGetUser = require("./get-user");
const makeGetUserByEmail = require("./get-user-by-email");

const makeGetUserByAccessToken = require("./get-user-by-accesstoken");
const makeDeleteUser = require("./delete-user");
const makeGetAllUser = require("./get-all-users");
const makeUpdateUser = require("./update-user");
const makeUpdateUserCol = require("./update-user-col");

const getAllUser = makeGetAllUser({
  Joi,
  ValidationError,
  userDb,
  NoDataFound,
});
const getUser = makeGetUser({ Joi, userDb, ValidationError, NoDataFound });
const getUserByEmail = makeGetUserByEmail({ Joi, userDb, ValidationError });

const getUserByAccessToken = makeGetUserByAccessToken({
  Joi,
  userDb,
  ValidationError,
});
const createUser = makeCreateUser({
  Joi,
  userDb,
  ValidationError,
  getUserByEmail,
});
const updateUser = makeUpdateUser({
  Joi,
  userDb,
  ValidationError,
});
const updateUserCol = makeUpdateUserCol({
  Joi,
  userDb,
  ValidationError,
});
const deleteUser = makeDeleteUser({
  Joi,
  userDb,
  ValidationError,
  NoDataFound,
});

module.exports = Object.freeze({
  createUser,
  getAllUser,
  getUser,
  getUserByEmail,
  getUserByAccessToken,
  updateUser,
  updateUserCol,
  deleteUser,
});
