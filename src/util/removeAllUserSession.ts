import { redis_client, USER_SESSION_PREFIX, REDIS_PREFIX } from "./constants";

export const removeSessions = async (userId: string) => {
  // get all sessions for the user
  const sessions = await redis_client.lrange(
    `${USER_SESSION_PREFIX}${userId}`,
    0,
    -1
  );

  sessions.forEach(
    async (id: string) => await redis_client.del(`${REDIS_PREFIX}${id}`) //append prefix since that's how we saved it in redis
  );

  //delete key list of all sessions for the userId
  await redis_client.del(`${USER_SESSION_PREFIX}${userId}`);
};
