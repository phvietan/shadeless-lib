import { sleep } from "@drstrain/drutil";
import { checker } from "./libs/check";
import { Config, IConfig } from "./libs/config";
import { FuzzStatus } from "./libs/repositories/status";

export interface IQueryLanguage<T> {
  query: (lastFilter: any) => Promise<T[]>;
}

export class QueryLanguage {
  protected config: Config;

  protected status: FuzzStatus = FuzzStatus.TODO;
  protected filter: any = {};
  protected all: boolean = false;
  protected doneInitDb: boolean = false;

  public setStatus(newStatus: FuzzStatus): QueryLanguage {
    this.status = newStatus;
    return this;
  }
  protected getStatusAsFilter(): any {
    if (this.status === FuzzStatus.ANY) return {};
    return {
      status: this.status,
    };
  }
  public setAll(a: boolean): QueryLanguage {
    this.all = a;
    return this;
  }
  public setFilter(f: any): QueryLanguage {
    this.filter = f;
    return this;
  }

  protected async checkDoneInitDatabase() {
    while (!this.doneInitDb) await sleep(300);
  }

  constructor(inputConfig: Partial<IConfig>) {
    this.config = new Config(inputConfig);
    checker(this.config).then(() => { this.doneInitDb = true; });
  }
}
