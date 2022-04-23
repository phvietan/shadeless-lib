import path from 'path';
import fs from 'fs/promises';
import {PacketResponse} from '../repositories/packet';

/**
 * Parse PacketResponse to Burp-like format
 *
 * @function
 * @param {FuzzStatus} packet - PacketResponse to be parsed
 * @param {string} bodyDir - The directory that holds Shadeless body files (E.g: `/home/$USER/go/src/shadeless-api/files/`)
 * @return {Promise<string>}
*/
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
