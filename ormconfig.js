require("dotenv").config();
const fs = require("fs");
var cfenv = require("cfenv");

var appEnv;
var prodUsername = "";
var prodPassword = "";
var prodDatabaseName = "";
var prodHost = "";
var prodPort = "";

if (process.env.NODE_ENV === "production") {
  appEnv = cfenv.getAppEnv();
  var postgres = "production" && appEnv.services["postgres"][0].credentials;
  prodUsername = postgres.username;
  prodPassword = postgres.password;
  prodHost = postgres.hostname;
  prodPort = postgres.port;
  prodDatabaseName = postgres.dbname;
}

const productionDatabase = {
  name: "production",
  type: "postgres",
  host: prodHost,
  port: prodPort,
  username: prodUsername,
  password: prodPassword,
  database: prodDatabaseName,
  synchronize: true,
  dropSchema: false,
  logging: false,
  entities: [__dirname + "/entity/**/*"],
  migrations: [__dirname + "migration/**/*"],
  subscribers: [__dirname + "/subscriber/**/*"],
  cli: {
    entitiesDir: __dirname + "/entity",
    migrationsDir: __dirname + "/migration",
    subscribersDir: __dirname + "/subscriber",
  },
};

const developmentDatabase = {
  name: "development",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "oneAPS",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*"],
  migrations: ["src/migration/**/*"],
  subscribers: ["src/subscriber/**/*"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

const testDatabase = {
  name: "test",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "oneAPS-test",
  synchronize: true,
  logging: false,
  dropSchema: true,
  entities: ["src/entity/**/*"],
  migrations: ["src/migration/**/*"],
  subscribers: ["src/subscriber/**/*"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

function getDatabase() {
  if (process.env.NODE_ENV === "development") return developmentDatabase;
  if (process.env.NODE_ENV === "test") return testDatabase;
  if (process.env.NODE_ENV === "production") return productionDatabase;
  return developmentDatabase;
}

module.exports = [getDatabase()];