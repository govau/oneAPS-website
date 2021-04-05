import { v4 as uuid } from "uuid";
import { redis_client, REDIS_FORGOT_PASSWORD_PREFIX } from "../constants";

export const createForgotPasswordLink = async (userId: string, url: string) => {
  const uniqueId = uuid();
  //Redis takes seconds, this gets seconds in the last 24 hours.
  const timeToExpiry: number = 60 * 60 * 24;

  const redisKey = `${REDIS_FORGOT_PASSWORD_PREFIX}${uniqueId}`;

  await redis_client.set(redisKey, userId, "ex", timeToExpiry);

  return `${url}/reset-password/${uniqueId}`;
};
