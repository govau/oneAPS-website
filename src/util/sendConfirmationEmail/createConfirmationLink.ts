import { v4 as uuid } from "uuid";
import { redis_client, REDIS_CONFIRMATION_EMAIL_PREFIX } from "../constants";

// stores redis key value of id: userID
// returns express server endpoint SERVER_URL/confirm/:id
// when link clicked, the link is invalidated and user is verified.
export const CreateConfirmationLink = async (userId: string, url: string) => {
  const id = uuid();
  //Redis takes seconds, this gets seconds in the last 24 hours.
  const timeToExpiry: number = 60 * 60 * 24;
  await redis_client.set(
    `${REDIS_CONFIRMATION_EMAIL_PREFIX}${id}`,
    userId,
    "ex",
    timeToExpiry
  );
  return `${url}/activate-user/${id}`;
};
