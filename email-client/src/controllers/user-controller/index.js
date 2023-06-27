const { Kafka } = require("kafkajs");
const Joi = require("joi");
const { userUseCases } = require("../../use-cases");
const ValidationError = require("../../exceptions/validation.error");

const createUserController = require("./create-user.controller");
const getAllUserController = require("./get-all-user.controller");
const getUserController = require("./get-user.controller");
const updateUserController = require("./update-user.controller");
const deleteUserController = require("./delete-user.controller");

const kafka = new Kafka({
  clientId: "EmailClint",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const createUserAction = createUserController({
  Joi,
  ValidationError,
  createUser: userUseCases.createUser,
  getUserByEmail: userUseCases.getUserByEmail,
  producer,
  // createDefaultFolders: folderUseCases.createDefaultFolders,
});
const getAllUserAction = getAllUserController({
  Joi,
  ValidationError,
  getAllUser: userUseCases.getAllUser,
});
const getUserAction = getUserController({
  Joi,
  ValidationError,
  getUser: userUseCases.getUser,
});
const updateUserAction = updateUserController({
  Joi,
  ValidationError,
  updateUser: userUseCases.updateUser,
  getUser: userUseCases.getUser,
});
const deleteUserAction = deleteUserController({
  Joi,
  ValidationError,
  deleteUser: userUseCases.deleteUser,
});
const userControllers = Object.freeze({
  createUserAction,
  getAllUserAction,
  getUserAction,
  updateUserAction,
  deleteUserAction,
});
module.exports = userControllers;
