import fs from "fs/promises";
import path from "path";
import { AxiosRequestConfig, Method } from "./axiosTypes";
import { IConfig, Config } from "./libs/config";
import { PacketRequest } from "./libs/repositories/packet";
import { requestToBurp } from 'axios-burp';

export function getHeaderMapFromHeaders(
  headers: string[],
): Record<string, string> {
  const result: Record<string, string> = {};
  headers.forEach((header) => {
    const delimiter = header.indexOf(': ');
    if (delimiter === -1) return;
    const key = header.slice(0, delimiter);
    const value = header.slice(delimiter + 2);
    if (key.toLowerCase() === 'content-length') return;
    result[key] = value;
  });
  return result;
}

export class PacketReader {
  private config: Config;

  constructor(inputConfig: Partial<IConfig>) {
    this.config = new Config(inputConfig);
  }

  async parseRequestToAxios(packet: PacketRequest): Promise<AxiosRequestConfig> {
    let body: string = '';
    try {
      body = await fs.readFile(
        path.join(this.config.bodyDir, packet.project, packet.requestBodyHash),
        'utf-8',
      );
    } catch (err: any) {
      body = err.message;
    }

    return {
      method: packet.method as Method,
      params: packet.querystring,
      url: `${packet.origin}${packet.path}`,
      headers: getHeaderMapFromHeaders(packet.requestHeaders),
      data: body,
    };
  }

  async parseRequestToBurp(packet: PacketRequest,) {
    const axiosRequest = await this.parseRequestToAxios(packet);
    return requestToBurp(axiosRequest);
  }
}
