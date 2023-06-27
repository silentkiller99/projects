const Joi = require("joi");
const ValidationError = require("../../exceptions/validation.error");

const { recipientDb } = require("../../data-access");

const makeCreateRecipient = require("./create-recipient");
const createRecipient = makeCreateRecipient({
  Joi,
  ValidationError,
  recipientDb,
});
module.exports = Object.freeze({ createRecipient });
