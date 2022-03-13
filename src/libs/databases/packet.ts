export interface PacketRequest {
  method: string;
  project: string;
  requestBodyHash: string;
  requestHeaders: string[];
  origin: string;
  path: string;
  querystring: string;
}
export interface Packet extends PacketRequest {
  _id?: string;
  requestPacketId: string;
  requestPacketPrefix: string;
  requestPacketIndex: number;

  toolName: string;
  requestLength: number;
  requestHttpVersion: string;
  requestContentType: string;
  referer: string;
  protocol: string;
  port: number;
  requestCookies: string;
  hasBodyParam: boolean;
  parameters: string[];

  responseStatus: number;
  responseContentType: string;
  responseStatusText: string;
  responseLength: number;
  responseMimeType: string;
  responseHttpVersion: string;
  responseInferredMimeType: string;
  responseCookies: string;
  responseBodyHash: string;
  responseHeaders: string[];

  rtt: number;
  reflectedParameters: Record<string, string>;
  codeName: string;

  created_at?: string;
  updated_at?: string;
}
