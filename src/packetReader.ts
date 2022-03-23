import {IConfig, Config} from './libs/config';
import {PacketRequest, PacketResponse} from './libs/repositories/packet';
import {request2Burp} from './libs/packetReader/request2Burp';
import {response2Burp} from './libs/packetReader/response2Burp';

interface IPacketReader {
  parseRequestToBurp: (packet: PacketRequest) => Promise<string>;
}

export class PacketReader implements IPacketReader {
  private config: Config;

  constructor(inputConfig: Partial<IConfig>) {
    this.config = new Config(inputConfig);
  }

  async parseRequestToBurp(packet: PacketRequest): Promise<string> {
    return request2Burp(packet, this.config.bodyDir);
  }
  async parseResponseToBurp(packet: PacketResponse): Promise<string> {
    return response2Burp(packet, this.config.bodyDir);
  }
}
