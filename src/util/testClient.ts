import * as rp from "request-promise";
import node_fetch from "node-fetch";

//Test client class for graphql requests
export class TestClient {
  url: string = process.env.TEST_HOST as string;
  options: {
    jar: any;
    withCredentials: boolean;
    json: boolean;
  };

  constructor() {
    this.options = {
      json: true,
      jar: rp.jar(),
      withCredentials: true,
    };
  }

  async register(bodyData: any) {
    return node_fetch(`${this.url}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
  }

  async activateUser(id: string) {
    return node_fetch(`${this.url}/activate-user/${id}`, {
      method: "",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
