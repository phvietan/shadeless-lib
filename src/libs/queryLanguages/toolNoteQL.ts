import {IConfig} from '../config';
import {FuzzStatus, ToolNote, toolNoteRepo} from '../repositories';
import {IQueryLanguage, QueryLanguage} from './queryLanguage';

/**
 * ToolNoteQL class helps querying collection "tool_notes" easier in Shadeless DB
 *
 * @class
 */
export class ToolNoteQL extends QueryLanguage<ToolNote> implements IQueryLanguage<ToolNote> {
  private tool: string = '';

  /**
   * Constructor to create ToolNoteQL
   *
   * @constructor
   * @param {Partial<IConfig>} inputConfig - Shadeless's config
  */
  constructor(inputConfig: Partial<IConfig>) {
    super(toolNoteRepo, inputConfig);
  }

  /**
   * Set tool name. For querying documents with specified tool name only
   *
   * @function
   * @param {string} newTool - threshold value to be setted
   * @return {this} this
  */
  public setTool(newTool: string): this {
    this.tool = newTool;
    return this;
  }

  /**
   * Query Shadeless database to get ToolNote documents that matched all specified properties
   *
   * @param {any} filter - The last filter to be applied right before querying
   * @return {Promise<ToolNote[]>} List of matched ToolNote documents
   *
  */
  async query(filter: any = {}): Promise<ToolNote[]> {
    await this.checkDoneInitDatabase();
    return this.db.getMany({
      tool: this.tool,
      project: this.config.choosingProject,
      ...filter,
    });
  }

  /**
   * Update Shadeless DB to set the input toolNote as "DONE"
   *
   * @param {Omit<Partial<ToolNote>, 'status'>} toolNote - The input toolNote to be setted
   *
  */
  async setQueryDone(toolNote: Omit<Partial<ToolNote>, 'status'>): Promise<void> {
    await this.checkDoneInitDatabase();
    delete (toolNote as any).status;
    const noteRow = await this.db.getOne({
      tool: this.tool,
      project: this.config.choosingProject,
      ...toolNote,
    });
    if (!noteRow) {
      await this.db.insertOne({
        tool: toolNote.tool || this.tool,
        key: toolNote.key || '',
        status: FuzzStatus.DONE,
        project: toolNote.project || this.config.choosingProject,
      });
    } else {
      await this.db.update({_id: noteRow._id}, {
        status: FuzzStatus.DONE,
      });
    }
  }

  /**
   * Update Shadeless DB to set the input toolNote as "TODO"
   *
   * @param {Omit<Partial<ToolNote>, 'status'>} toolNote - The input toolNote to be setted
   *
  */
  async setQueryTodo(toolNote: Omit<Partial<ToolNote>, 'status'>): Promise<void> {
    await this.checkDoneInitDatabase();
    delete (toolNote as any).status;
    const noteRow = await this.db.getOne(toolNote);
    if (!noteRow) {
      await this.db.insertOne({
        tool: toolNote.tool || '',
        key: toolNote.key || '',
        status: FuzzStatus.TODO,
        project: this.config.choosingProject,
      });
    } else {
      await this.db.update({_id: noteRow._id}, {
        status: FuzzStatus.TODO,
      });
    }
  }
}
