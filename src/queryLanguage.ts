import { sleep } from "@drstrain/drutil";
import { checker } from "./libs/check";
import { Config, IConfig } from "./libs/config";
import { Repository } from "./libs/repositories/repository";
import { FuzzStatus, MongoItem } from "./libs/repositories/status";

export interface IQueryLanguage<T extends MongoItem> {
  query: (lastFilter: any) => Promise<T[]>;
  setQueryDone: (listItems: T[]) => Promise<void>;
  setQueryTodo: (listItems: T[]) => Promise<void>;
}

export class QueryLanguage<T extends MongoItem> {

  protected db: Repository<T>;  
  protected config: Config;
  protected status: FuzzStatus = FuzzStatus.TODO;
  protected filter: any = {};
  protected all: boolean = false;
  protected doneInitDb: boolean = false;

  constructor(db: Repository<T>, inputConfig: Partial<IConfig>) {
    this.db = db;
    this.config = new Config(inputConfig);
    checker(this.config).then(() => { this.doneInitDb = true; });
  }

  protected getStatusAsFilter(): any {
    if (this.status === FuzzStatus.ANY) return {};
    return {
      status: this.status,
    };
  }
  public setStatus(newStatus: FuzzStatus): QueryLanguage<T> {
    this.status = newStatus;
    return this;
  }
  public setAll(a: boolean): QueryLanguage<T> {
    this.all = a;
    return this;
  }
  public setFilter(f: any): QueryLanguage<T> {
    this.filter = f;
    return this;
  }

  protected async checkDoneInitDatabase() {
    while (!this.doneInitDb) await sleep(300);
  }

  public async setQueryDone(items: T[]): Promise<void> {
    for (let i = 0; i < items.length; ++i) {
      const p = items[i];
      await this.db.update({ _id: p._id }, {
        status: FuzzStatus.DONE,
      });
    }
  }

  public async setQueryTodo(items: T[]): Promise<void> {
    for (let i = 0; i < items.length; ++i) {
      const p = items[i];
      await this.db.update({ _id: p._id }, {
        status: FuzzStatus.TODO,
      });
    }
  }
}
