import { Packet } from './packet';
import { FuzzStatus } from './status';
import { Repository } from './repository';

export interface ParsedPacket extends Packet {
  hash: string;
  result: string[];
  status: FuzzStatus;
  staticScore: number;
  logDir: string;
}

class ParsedPacketRepository extends Repository<ParsedPacket> { };

export const parsedPacketRepo = new ParsedPacketRepository();
