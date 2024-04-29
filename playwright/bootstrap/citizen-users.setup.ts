import urls from "../config/urls";
import { Logger } from "@hmcts/nodejs-logging";
import IdamClient from "../helpers/idam-client";
import CitizenUserStateHelper from "../helpers/citizen-users-state-helper";
import { claimant, defendant } from "../config/users";
import User from "../models/User";
import { config } from "../config/config";
import UserRole from "../models/UserRole";

const logger = Logger.getLogger("idamClient");

const handleError = (error) => {
  console.log("Error during bootstrap, exiting", error);
  process.exit(1);
};

const createCitizenUserIfDoesntExist = async ({
  email,
  password,
  role = UserRole.CITIZEN,
}: User) => {
  let bearerToken: string | undefined;
  try {
    console.log(`Authenticate user: ${email} `);
    bearerToken = await IdamClient.authenticateUser({ email, password });
  } catch (error) {
    if(error.response) {
      logger.warn(`Failed authenticate User for: ${email}`);
      logger.warn(`Status Code: ${error.response}`);
      logger.warn(`Status Message: ${error.response.statusText}`);
    }
    try {
      await IdamClient.createCitizenUser({ email, password, role });
    } catch (err) {
      if (err && err.statusCode === 409) {
        logger.info(`ERROR:: User ${email} already exists.`);
      } else {
        throw err;
      }
    }
    bearerToken = await IdamClient.authenticateUser({ email, password });
  }
};

const globalSetup = async () => {
  if(!config.skipCitizenSetup) {
    try {
      if (urls.idamApi) {
        await Promise.all([
          createCitizenUserIfDoesntExist(claimant),
          createCitizenUserIfDoesntExist(defendant),
        ]);
      }
      CitizenUserStateHelper.addUsersToState({
        claimant,
        defendant,
      });
    } catch (error) {
      handleError(error);
    }
  } else {
    console.log("SKIP_CITIZEN_SETUP: Skipping claimant and defendant user creation");
  }
};

export default globalSetup;
