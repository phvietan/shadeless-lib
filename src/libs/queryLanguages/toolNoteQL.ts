import {IConfig} from '../config';
import {FuzzStatus, ToolNote, toolNoteRepo} from '../repositories';
import {IQueryLanguage, QueryLanguage} from './queryLanguage';

export class ToolNoteQL extends QueryLanguage<ToolNote> implements IQueryLanguage<ToolNote> {
  private tool: string = '';

  constructor(inputConfig: Partial<IConfig>) {
    super(toolNoteRepo, inputConfig);
  }

  public setTool(newTool: string) {
    this.tool = newTool;
    return this;
  }

  async query(filter: any = {}): Promise<ToolNote[]> {
    await this.checkDoneInitDatabase();
    return this.db.getMany({
      tool: this.tool,
      project: this.config.choosingProject,
      ...filter,
    });
  }

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
