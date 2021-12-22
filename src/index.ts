import axios, { AxiosInstance, AxiosResponse } from "axios";
import { NSResponse, MXResponse, AResponse, TXTResponse } from "./types";

export default class MojoDnsclient {
  private readonly axiosClient: AxiosInstance;

  constructor(apiKey: string) {
    this.axiosClient = axios.create({
      baseURL: "https://api.mojodns.com/api/dns",
      headers: {
        Authorization: apiKey,
      },
    });
  }

  public async getNS(domain: string): Promise<NSResponse> {
    const result: AxiosResponse<NSResponse> = await this.axiosClient.get(
      `/${domain}/NS`
    );

    // check for status codes between 200 and 299
    if (result.status < 200 || result.status > 299) {
      throw new Error(result.statusText);
    }
    if (result.data.responseCode !== "NO_ERROR") {
      throw new Error(result.data.responseCode);
    }
    return result.data;
  }

  public async getMX(domain: string): Promise<MXResponse> {
    const result: AxiosResponse<MXResponse> = await this.axiosClient.get(
      `/${domain}/MX`
    );

    // check for status codes between 200 and 299
    if (result.status < 200 || result.status > 299) {
      throw new Error(result.statusText);
    }
    if (result.data.responseCode !== "NO_ERROR") {
      throw new Error(result.data.responseCode);
    }
    return result.data;
  }

  public async getA(domain: string): Promise<AResponse> {
    const result: AxiosResponse<AResponse> = await this.axiosClient.get(
      `/${domain}/A`
    );

    // check for status codes between 200 and 299

    if (result.status < 200 || result.status > 299) {
      throw new Error(result.statusText);
    }

    // check if 200 response has empty answer record
    if (result.data.responseCode !== "NO_ERROR") {
      throw new Error(result.data.responseCode);
    }
    return result.data;
  }

  public async getTXT(domain: string): Promise<TXTResponse> {
    const result: AxiosResponse<TXTResponse> = await this.axiosClient.get(
      `/${domain}/TXT`
    );

    // check for status codes between 200 and 299

    if (result.status < 200 || result.status > 299) {
      throw new Error(result.statusText);
    }

    // check if 200 response has empty answer record
    if (result.data.responseCode !== "NO_ERROR") {
      throw new Error(result.data.responseCode);
    }
    return result.data;
  }
}
