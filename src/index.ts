import axios, { AxiosInstance, AxiosResponse } from "axios";

interface Response {
  authoritativeAnswer: boolean;
  isTimeout: boolean;
  responseCode: string;
  reportingNameServer: string;
  answerResourceRecords: Record[];
}

export interface NSResponse extends Response {
  answerResourceRecords: NSRecord[];
}

export interface MXResponse extends Response {
  answerResourceRecords: MXRecord[];
}

export interface AResponse extends Response {
  answerResourceRecords: ARecord[];
}

export interface TXTResponse extends Response {
  answerResourceRecords: TXTRecord[];
}
interface Record {
  dnsName: string;
  resourceType: number;
  resourceTypeName: string;
  resourceClass: number;
  resourceClassName: string;
  timeInterval: number;
  md5_Checksum: string;
}

interface NSRecord extends Record {
  authoritativeName: {
    text: string;
  };
}

interface MXRecord extends Record {
  preference: number;
  exchangeName: { text: string };
}

interface ARecord extends Record {
  address: number;
  ipAddress: string;
}

interface TXTRecord extends Record {
  text: {
    text: string;
  };
}

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
