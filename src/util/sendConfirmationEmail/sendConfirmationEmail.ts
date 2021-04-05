import { Client } from "@govau-platforms/notify-client";
import { NOTIFY_KEY } from "../constants";
require("dotenv").config();

const notify_client = new Client({
  apiKey: NOTIFY_KEY,
});

export const sendConfirmationEmail = async (
  emailAddress: string,
  name: string,
  confirm_url: string
) => {
  const templateId = "47112fdc-4e78-47de-9f63-d3b66d677306";

  await notify_client.sendEmail(templateId, emailAddress, {
    personalisation: {
      confirm_url,
      name,
    },
  });
};
