import path from 'path';
import fs from 'fs/promises';
import { Method } from "../../axiosTypes";
import { PacketRequest } from "../repositories/packet";
import { getHeaderMapFromHeaders } from './helper';
import { requestToBurp } from 'axios-burp';

export async function request2Burp(packet: PacketRequest, bodyDir: string): Promise<string> {
  let body: string = '';
  try {
    body = await fs.readFile(
      path.join(bodyDir, packet.project, packet.requestBodyHash),
      'utf-8',
    );
  } catch (err: any) {
    body = err.message;
  }

  const axiosProps = {
    method: packet.method as Method,
    params: packet.querystring,
    url: `${packet.origin}${packet.path}`,
    headers: getHeaderMapFromHeaders(packet.requestHeaders),
    data: body,
  };
  return requestToBurp(axiosProps);
}