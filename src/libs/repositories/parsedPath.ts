import { Repository } from './repository';
import { FuzzStatus, MongoItem } from './status';

export interface ParsedPath extends MongoItem {
  requestPacketId: string;
  origin: string;
  path: string;
  status: FuzzStatus;
  project: string;
  force: boolean;
  created_at?: Date;
  updated_at?: Date;
  error: string;
}

class ParsedPathRepository extends Repository<ParsedPath> { };

export const parsedPathRepo = new ParsedPathRepository();
