import Client from "../src/index";

import type {
  NSResponse,
  MXResponse,
  AResponse,
  TXTResponse,
} from "../src/types";

/**
 * Development key for testing the free plan
 */
const DEV_KEY = "2cf00d90-32d7-4a28-8ebd-d1cf3284e8ac";

const client = new Client(DEV_KEY);

describe("Client", () => {
  it("Default scaffold", () => {
    client
      .getA("google.com")
      .then((res) =>
        expect(res.answerResourceRecords[0].dnsName).toBe("google.com")
      )
      .catch((err) => console.error(err));
  });
  it("should abort on invalid domain", () => {
    expect.assertions(1);
    return client.getA("google.cwwom").catch((err) => {
      expect(err.message).toMatch("aborted");
    });
  });
});
