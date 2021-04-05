import { json } from "body-parser";
import { response } from "express";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import {
  error_invalidConfirmationLink,
  error_userCreatedNotVerified,
  redis_client,
  REDIS_CONFIRMATION_EMAIL_PREFIX,
} from "../../util/constants";
import { connection } from "../../util/createConnection";
import { CreateConfirmationLink } from "../../util/sendConfirmationEmail/createConfirmationLink";
import { TestClient } from "../../util/testClient";
import {
  badEmail,
  badPassword,
  firstName,
  nonGovEmail,
  validEmail,
  validPassword,
} from "../../util/testData";
import {
  error_invalidEmail,
  error_nonGovEmail,
  error_passwordWeak,
} from "../../util/yup";

const client = new TestClient();
let userId: string = "";

beforeAll(async () => {
  await connection.create();

  const inactiveUser = User.create({
    name: firstName,
    email: "test23@test.gov.au",
    password: validPassword,
  });
  await inactiveUser.save();
  userId = inactiveUser.id;
});

afterAll(async () => {
  await getConnection().getRepository(User).delete({});
  await connection.close();
});

describe("Register a new user", () => {
  test("Register new user valid data", async () => {
    const formData = {
      name: firstName,
      email: validEmail,
      password: validPassword,
    };

    const response = await client.register(JSON.stringify(formData));
    expect(response.status).toEqual(200);

    //Check user created in DB

    const user = await User.findOne({ where: { email: validEmail } });

    expect(user?.name).toEqual(firstName);
    expect(user?.verified).toEqual(false);
  });
});

describe("Enter invalid fields", () => {
  test("Enter bad email gives 400", async () => {
    const formData = {
      name: firstName,
      email: badEmail,
      password: validPassword,
    };
    const response = await client.register(JSON.stringify(formData));
    expect(response.status).toEqual(400);
    // get HTML text
    const html = await response.text();
    expect(html).toContain(error_invalidEmail);
  });
  test("Enter non gov au email gives 400", async () => {
    const formData = {
      name: firstName,

      email: nonGovEmail,
      password: validPassword,
    };
    const response = await client.register(JSON.stringify(formData));
    const html = await response.text();
    expect(html).toContain(error_nonGovEmail);
    expect(response.status).toEqual(400);
  });
  test("Enter bad password gives error", async () => {
    const formData = {
      name: firstName,
      email: validEmail,
      password: badPassword,
    };
    const response = await client.register(JSON.stringify(formData));
    const html = await response.text();

    expect(html).toContain(error_passwordWeak);
    expect(response.status).toEqual(400);
  });
});

describe("Enter dupe users", () => {
  test("Enter same email user throws error", async () => {
    const formData = {
      name: firstName,
      email: validEmail,
      password: validPassword,
    };

    // add user
    await client.register(JSON.stringify(formData));

    // try adding same user again
    const response = await client.register(JSON.stringify(formData));
    const html = await response.text();

    expect(html).toContain(error_userCreatedNotVerified(validEmail));
    expect(response.status).toEqual(409);
  });
});

describe("Test activating users", () => {
  test("invalid uuid", async () => {
    const response = await client.activateUser("32eds");
    const html = await response.text();

    expect(html).toContain(error_invalidConfirmationLink);
    expect(response.status).toEqual(400);
  });

  test("test activating valid but inactive user", async () => {
    const activationLink: string = await CreateConfirmationLink(
      userId,
      "http://localhost:3000"
    );

    const urlSplit = activationLink.split("/");
    const redis_key = urlSplit[urlSplit.length - 1];
    const userid = await redis_client.get(
      `${REDIS_CONFIRMATION_EMAIL_PREFIX}${redis_key}`
    );

    expect(userid).toEqual(userId);
    await client.activateUser(redis_key);

    // need to check if redis has deleted key
    const checkDeletedId = await redis_client.get(
      `${REDIS_CONFIRMATION_EMAIL_PREFIX}${redis_key}`
    );

    expect(checkDeletedId).toBeFalsy();
  });

  test("Already active user returns 400", async () => {
    const activationLink: string = await CreateConfirmationLink(
      userId,
      "http://localhost:3000"
    );
    const urlSplit = activationLink.split("/");
    const redis_key = urlSplit[urlSplit.length - 1];
    const response = await client.activateUser(redis_key);
    const { redirected, url, status } = response;

    expect(redirected).toEqual(true);
    expect(url).toContain("/login");
    expect(status).toEqual(400);
  });
});
