import { getWlblFilter } from "./libs/repositories/getWlblFilter";
import { ParsedPath, parsedPathRepo } from "./libs/repositories/parsedPath";
import { IQueryLanguage, QueryLanguage } from "./queryLanguage";

export class PathQL extends QueryLanguage implements IQueryLanguage<ParsedPath> {

  async query(lastFilter: any = {}): Promise<ParsedPath[]> {
    await this.checkDoneInitDatabase();
    const filter = {
      ...this.getStatusAsFilter(),
      ...await getWlblFilter(this.config.choosingProject, this.all),
      ...this.filter,
      ...lastFilter,
    };
    const listPaths = await parsedPathRepo.getByProjectName(this.config.choosingProject, filter);
    return listPaths;
  }

}
