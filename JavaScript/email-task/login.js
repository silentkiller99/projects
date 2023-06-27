// const CLIENT_ID =
//   "350406253267-291m3ridrlb7774uhc81jikklpr1jud3.apps.googleusercontent.com";
// const API_KEY = "AIzaSyDnn38mhkovC0vcSEMwBnErhfBRnupKiSU";

/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console

const CLIENT_ID =
  "350406253267-291m3ridrlb7774uhc81jikklpr1jud3.apps.googleusercontent.com";
const API_KEY = "AIzaSyDnn38mhkovC0vcSEMwBnErhfBRnupKiSU";

const redirect_uri =
  "http://127.0.0.1:5500/JavaScript/email-task/mail-man/mail-trump.html";
// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES =
  "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile ";

let tokenClient;
let accessToken;
let gapiInited = false;
let gisInited = false;

document.getElementById("authorize_button").style.visibility = "hidden";
document.getElementById("signout_button").style.visibility = "hidden";

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: redirect_uri,
    response_type: "token",
    callback: "", // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById("authorize_button").style.visibility = "visible";
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }

    document.getElementById("signout_button").style.visibility = "visible";
    document.getElementById("authorize_button").innerText = "Refresh";
    await listLabels();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  let token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken("");
    document.getElementById("content").innerText = "";
    document.getElementById("authorize_button").innerText = "Login";
    document.getElementById("signout_button").style.visibility = "hidden";
  }
}

/**
 * Print all Labels in the authorized user's inbox. If no labels
 * are found an appropriate message is printed.
 */
async function listLabels() {
  let response, response2;
  // let token = gapi.client.getToken();
  try {
    response = await gapi.client.gmail.users.labels.list({
      userId: "me",
    });
    console.log(response);
  } catch (err) {
    document.getElementById("content").innerText = err.message;
    return;
  }
  const labels = response.result.labels;
  if (!labels || labels.length == 0) {
    document.getElementById("content").innerText = "No labels found.";
    return;
  }
  // Flatten to string to display
  const output = labels.reduce(
    (str, label) => `${str}${label.name}\n`,
    "Labels:\n"
  );

  document.getElementById("content").innerText = output;
}
