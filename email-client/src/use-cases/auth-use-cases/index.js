const ValidationError = require("../../exceptions/validation.error");
const NoDataFound = require("../../exceptions/no-data-found.error");
const Joi = require("joi");

const { authServices } = require("../../external-service-call");
const makeGetAuthToken = require("./get-auth-token");
const getAuthToken = makeGetAuthToken({ Joi, ValidationError, authServices });

const makeGetGoogleUser = require("./get-google-user");
const getGoogleUser = makeGetGoogleUser({ Joi, ValidationError, authServices });

const makeGetAccessToken = require("./get-access-token");
const getAccessToken = makeGetAccessToken({
  Joi,
  ValidationError,
  authServices,
});

module.exports = Object.freeze({ getAuthToken, getGoogleUser, getAccessToken });
