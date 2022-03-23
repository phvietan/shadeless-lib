import {IConfig} from './libs/config';
import {getWlblFilter} from './libs/repositories/getWlblFilter';
import {ParsedPath, parsedPathRepo} from './libs/repositories/parsedPath';
import {IQueryLanguage, QueryLanguage} from './queryLanguage';

export class PathQL extends QueryLanguage<ParsedPath> implements IQueryLanguage<ParsedPath> {
  constructor(inputConfig: Partial<IConfig>) {
    super(parsedPathRepo, inputConfig);
  }

  async query(lastFilter: any = {}): Promise<ParsedPath[]> {
    await this.checkDoneInitDatabase();
    const filter = {
      ...this.getStatusAsFilter(),
      ...await getWlblFilter(this.config.choosingProject, this.all),
      ...this.filter,
      ...lastFilter,
    };
    const listPaths = await this.db.getByProjectName(this.config.choosingProject, filter);
    return listPaths;
  }
}
