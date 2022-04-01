import {Packet} from './packet';
import {FuzzStatus} from './status';
import {Repository} from './repository';

/**
 * ParsedPacket interface is document for collection "parsed_packets" in Shadeless DB
 *
 * This collection is used for storing parsed packets to fuzz
 *
 * @interface ParsedPacket
 * @extends Packet
 * @property hash - The unique identifier for parsedPacket. The hash consists of: method, origin, path, parameters
 * @property status - [DEPRECATED] The fuzzing status, please use ToolNote for storing which parsed packet has fuzzed
 * @property staticScore - The score to indicates whether it is API endpoints or static file endpoints. The lesser staticScore is, the more likely it is to be an API endpoint, scale from [0 - 100]
 */
export interface ParsedPacket extends Packet {
  hash: string;
  status: FuzzStatus;
  staticScore: number;
}

/**
 * ParsedPacketRepository class for querying "parsed_packets" collection in Shadeless DB
 *
 * @class
 */
class ParsedPacketRepository extends Repository<ParsedPacket> { }

export const parsedPacketRepo = new ParsedPacketRepository();
