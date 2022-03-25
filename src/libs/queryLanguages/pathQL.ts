import {IConfig} from '../config';
import {FuzzStatus} from '../repositories';
import {getWlblFilter} from '../repositories/getWlblFilter';
import {ParsedPath, parsedPathRepo} from '../repositories/parsedPath';
import {ParsedItemQL} from './parsedItemQL';
import {IQueryLanguage} from './queryLanguage';

export class PathQL extends ParsedItemQL<ParsedPath> implements IQueryLanguage<ParsedPath> {
  private status: FuzzStatus = FuzzStatus.ANY;

  constructor(inputConfig: Partial<IConfig>) {
    super(parsedPathRepo, inputConfig);
  }

  public setStatus(newStatus: FuzzStatus) {
    this.status = newStatus;
    return this;
  }
  private getStatusAsFilter(): any {
    if (this.status === FuzzStatus.ANY) return {};
    return {status: this.status};
  }

  async query(lastFilter: any = {}): Promise<ParsedPath[]> {
    await this.checkDoneInitDatabase();
    const filter = {
      ...this.getStatusAsFilter(),
      ...await getWlblFilter(this.config.choosingProject, this.all),
      ...lastFilter,
    };
    const listPaths = await this.db.getMany(filter);
    return listPaths;
  }
}
