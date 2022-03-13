import { Repository } from './repository';
import { FuzzStatus } from './status';

export interface ParsedPath {
  _id?: string;
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
