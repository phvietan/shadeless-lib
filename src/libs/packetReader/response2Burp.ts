import path from 'path';
import fs from 'fs/promises';
import {PacketResponse} from '../repositories/packet';

export async function response2Burp(packet: PacketResponse, bodyDir: string): Promise<string> {
  let body: string = '';
  try {
    body = await fs.readFile(
        path.join(bodyDir, packet.project, packet.responseBodyHash),
        'utf-8',
    );
  } catch (err: any) {
    body = err.message;
  }

  const burpRespHeaders = packet.responseHeaders.reduce((prev, cur) => prev + cur + '\r\n', '');
  return burpRespHeaders + '\r\n' + body;
}