const axios = require("axios");
const qs = require("qs");
const { key } = require("../../config/backend-config/development");
const getAuthToken = require("./get-auth-token");
const authToken = getAuthToken({ axios, qs });

const getGoogleUser = require("./get-google-user");
const googleUser = getGoogleUser({ axios });

const makeGetAccessToken = require("./get-access-token");
const getAccessToken = makeGetAccessToken({ axios, qs, key });

module.exports = Object.freeze({ authToken, googleUser, getAccessToken });
