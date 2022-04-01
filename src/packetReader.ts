import {Config, IConfig} from './libs/config';
import {PacketRequest, PacketResponse} from './libs/repositories/packet';
import {request2Burp} from './libs/packetReader/request2Burp';
import {response2Burp} from './libs/packetReader/response2Burp';

/**
 * PacketReader class for parsing PacketRequest and PacketResponse to string of burp-like format
 *
 * @class PacketReader
*/
export class PacketReader {
  private config: Config;

  /**
   * Constructor to create PacketReader
   *
   * @constructor
   * @param {Partial<IConfig>} inputConfig - Shadeless's config
  */
  constructor(inputConfig: Partial<IConfig>) {
    this.config = new Config(inputConfig);
  }

  /**
   * Parse packet request to burp-like request format
   *
   * @function
   * @param {PacketRequest} packet - Packet request which will be parsed
   * @return {Promise<string>} Burp-like packet request format
  */
  async parseRequestToBurp(packet: PacketRequest): Promise<string> {
    return request2Burp(packet, this.config.bodyDir);
  }

  /**
   * Parse packet response to burp-like response format
   *
   * @function
   * @param {PacketRequest} packet - Packet response which will be parsed
   * @return {Promise<string>} Burp-like packet response format
   */
  async parseResponseToBurp(packet: PacketResponse): Promise<string> {
    return response2Burp(packet, this.config.bodyDir);
  }
}
