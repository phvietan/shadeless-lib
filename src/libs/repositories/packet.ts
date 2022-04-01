import {MongoItem} from './status';

/**
 * Minimal properties that can craft to burp request
 *
 * @interface PacketRequest
 */
export interface PacketRequest {
  method: string;
  project: string;
  requestBodyHash: string;
  requestHeaders: string[];
  origin: string;
  path: string;
  querystring: string;
}

/**
 * Minimal properties that can craft to burp response
 *
 * @interface PacketResponse
 */
export interface PacketResponse {
  project: string;
  responseBodyHash: string;
  responseHeaders: string[];
}

/**
 * Packet interface is document for collection "packets" in Shadeless DB
 *
 * @private However query language does not expose this interface for usage
 * @interface Packet
 * @extends PacketRequest
 * @extends PacketResponse
 * @extends MongoItem
 */
export interface Packet extends PacketRequest, PacketResponse, MongoItem {
  toolName: string;
  requestPacketId: string;
  requestPacketPrefix: string;
  requestPacketIndex: number;

  requestLength: number;
  requestHttpVersion: string;
  requestContentType: string;
  referer: string;
  protocol: string;
  port: number;
  requestCookies: string;
  hasBodyParam: boolean;
  parameters: string[];

  responseContentType: string;
  responseStatus: number;
  responseStatusText: string;
  responseLength: number;
  responseMimeType: string;
  responseHttpVersion: string;
  responseInferredMimeType: string;
  responseCookies: string;

  rtt: number;
  reflectedParameters: Record<string, string>;
  codeName: string;
}