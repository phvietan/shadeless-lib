import { Config, IConfig } from "./libs/config";
import { checker } from './libs/check';
import { getWlblFilter } from "./libs/databases/getWlblFilter";
import { get, ParsedPath } from "./libs/databases/parsedPath";
import { initDatabases } from './libs/databases/init';
import { sleep } from "@drstrain/drutil";

export class PathQL {
  config: Config;

  private doneInitDb: boolean = false;
  private filter: any = {};
  private all: boolean = false;

  public setAll(a: boolean): PathQL {
    this.all = a;
    return this;
  }
  public getAll() { return this.all; }

  public setFilter(f: any): PathQL {
    this.filter = f;
    return this;
  }
  public getFilter() { return this.filter; }

  constructor(inputConfig: Partial<IConfig>) {
    this.config = new Config(inputConfig);
    checker(this.config).then(() => { this.doneInitDb = true; });
  }

  async queryPath(lastFilter: any = {}): Promise<ParsedPath[]> {
    if (!this.doneInitDb) {
      await sleep(300);
      return this.queryPath(lastFilter);
    }
    const filter = {
      ...await getWlblFilter(this.config.choosingProject, this.all),
      ...this.filter,
      ...lastFilter,
    };
    const listPaths = await get(this.config.choosingProject, filter);
    return listPaths;
  }
}
