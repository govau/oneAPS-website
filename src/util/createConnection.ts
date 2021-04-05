import { createConnection, getConnectionOptions, getConnection } from "typeorm";

export const connection = {
  async create() {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    await createConnection({ ...connectionOptions, name: "default" });
  },
  async close() {
    await getConnection().close();
  },
};