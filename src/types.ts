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
