import {sleep} from '@drstrain/drutil';
import {checker} from '../check';
import {Config, IConfig} from '../config';
import {MongoItem} from '../repositories';
import {Repository} from '../repositories/repository';

export interface IQueryLanguage<T extends MongoItem> {
  queryId: (id: string) => Promise<T | undefined | null>;
  query: (lastFilter: any) => Promise<T[]>;
  setQueryDone: (...args: any[]) => any;
  setQueryTodo: (...args: any[]) => any;
}

export class QueryLanguage<T extends MongoItem> {
  private doneInitDb: boolean = false;
  protected db: Repository<T>;
  protected config: Config;

  constructor(db: Repository<T>, inputConfig: Partial<IConfig>) {
    this.db = db;
    this.config = new Config(inputConfig);
    checker(this.config).then(() => {
      this.doneInitDb = true;
    });
  }

  protected async checkDoneInitDatabase() {
    while (!this.doneInitDb) await sleep(200);
  }

  async queryId(_id: string) {
    const item = await this.db.getOne({_id});
    return item;
  }
}
