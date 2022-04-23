import path from 'path';
import fs from 'fs/promises';
import {HttpMethod} from '../../axiosTypes';
import {PacketRequest} from '../repositories/packet';
import {getHeaderMapFromHeaders} from './helper';
import {requestToBurp} from 'axios-burp';

/**
 * Parse PacketRequest to Burp-like format
 *
 * @function
 * @param {FuzzStatus} packet - PacketRequest to be parsed
 * @param {string} bodyDir - The directory that holds Shadeless body files (E.g: `/home/$USER/go/src/shadeless-api/files/`)
 * @return {Promise<string>}
*/
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
    method: packet.method as HttpMethod,
    params: packet.querystring,
    url: `${packet.origin}${packet.path}`,
    headers: getHeaderMapFromHeaders(packet.requestHeaders),
    data: body,
  };
  return requestToBurp(axiosProps);
}
