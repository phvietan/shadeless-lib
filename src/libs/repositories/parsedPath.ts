import {Repository} from './repository';
import {FuzzStatus, MongoItem} from './status';

/**
 * ParsedPath interface is document for collection "parsed_paths" in Shadeless DB
 *
 * This collection is used for storing interested paths to fuzz
 *
 * @interface ParsedPath
 * @property requestPacketId - The packetID that can be linked with "parsed_packets" collection
 * @property origin - Origin of the target
 * @property path - Path of the target
 * @property status - Fuzzing status of the document
 * @property project - Project name
 */
export interface ParsedPath extends MongoItem {
  requestPacketId: string;
  origin: string;
  path: string;
  status: FuzzStatus;
  project: string;
}

/**
 * ParsedPathRepository class for querying "parsed_paths" collection in Shadeless DB
 *
 * @class
 */
class ParsedPathRepository extends Repository<ParsedPath> { }

export const parsedPathRepo = new ParsedPathRepository();
