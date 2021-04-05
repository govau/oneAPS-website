require("dotenv").config();
var cfenv = require("cfenv");
import Redis from "ioredis";
let appEnv: any;
const REDIS_PORT = 6379;

export const ENVIRONMENT = process.env.NODE_ENV;

export const REDIS_PREFIX = "sess:";
export const REDIS_CONFIRMATION_EMAIL_PREFIX = "confirmEmail:";
export const USER_SESSION_PREFIX = "userSessionList:";
export const REDIS_FORGOT_PASSWORD_PREFIX = "forgotPassword:";

const { url } =
  ENVIRONMENT === "production" && appEnv.services["redis"][0].credentials;
export let redis_client = new Redis({ port: REDIS_PORT });

export let sessionSecret = "SecretKey";
if (ENVIRONMENT === "production") {
  appEnv = cfenv.getAppEnv();
  sessionSecret =
    appEnv.services["user-provided"][0].credentials.SESSION_SECRET;
  redis_client = new Redis(url);
}

const notify_key = () => {
  if (ENVIRONMENT === "test") {
    return process.env.NOTIFY_TEST_KEY;
  }
  if (ENVIRONMENT === "development") return process.env.NOTIFY_TEST_KEY;
  if (ENVIRONMENT === "production")
    return appEnv.services["user-provided"][0].credentials.NOTIFY_LIVE_KEY;
};

export const NOTIFY_KEY = notify_key();

// Error messages

export const error_userCreatedNotVerified = (userEmail: string) => {
  return `The user has been created, but the email is yet to be verified. Please check ${userEmail} for a confirmation link`;
};

export const error_userAlreadyExists = "The user already exists;";

export const error_invalidConfirmationLink =
  "Invalid confirmation link. Your link may have expired";
