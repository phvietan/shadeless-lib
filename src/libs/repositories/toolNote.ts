import {Repository} from './repository';
import {FuzzStatus, MongoItem} from './status';

/**
 * ToolNote interface is document for collection "tool_notes" in Shadeless DB
 *
 * This collection is used for additional notes when attempt to recon/fuzzing
 *
 * @interface ToolNote
 * @property tool - Tool name
 * @property key - Key value to note
 * @property project - Project name
 * @property status - Recon/Fuzz status
 */
export interface ToolNote extends MongoItem {
  tool: string;
  key: string;
  project: string;
  status: FuzzStatus;
}

/**
 * ToolNoteRepository class for querying "tool_notes" collection in Shadeless DB
 *
 * @class
 */
class ToolNoteRepository extends Repository<ToolNote> { }

export const toolNoteRepo = new ToolNoteRepository();