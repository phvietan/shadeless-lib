import {Repository} from './repository';
import {FuzzStatus, MongoItem} from './status';

export interface ToolNote extends MongoItem {
  tool: string;
  key: string;
  project: string;
  status: FuzzStatus;
}

class ToolNoteRepository extends Repository<ToolNote> { };

export const toolNoteRepo = new ToolNoteRepository();