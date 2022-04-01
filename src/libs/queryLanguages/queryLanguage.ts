import {sleep} from '@drstrain/drutil';
import {checker} from '../check';
import {Config, IConfig} from '../config';
import {MongoItem} from '../repositories';
import {Repository} from '../repositories/repository';

/**
 * IQueryLanguage interface defines methods for a QueryLanguage class
 *
 * @interface IQueryLanguage
 * @method queryId
 */
export interface IQueryLanguage<T extends MongoItem> {
  queryId: (id: string) => Promise<T | undefined | null>;
  query: (lastFilter: any) => Promise<T[]>;
  setQueryDone: (...args: any[]) => any;
  setQueryTodo: (...args: any[]) => any;
}

/**
 * QueryLanguage class is the prototype class for all QL classes
 */
export class QueryLanguage<T extends MongoItem> {
  private doneInitDb: boolean = false;
  protected db: Repository<T>;
  protected config: Config;

  /**
   * Constructor to create QueryLanguage
   *
   * @constructor
   * @param {Repository<T>} db - The repository corresponds with the QueryLanguage
   * @param {Partial<IConfig>} inputConfig - Shadeless's config
  */
  constructor(db: Repository<T>, inputConfig: Partial<IConfig>) {
    this.db = db;
    this.config = new Config(inputConfig);
    checker(this.config).then(() => {
      this.doneInitDb = true;
    });
  }

  /**
   * Check and wait for database to be done initialized 
   *
   * @function
  */
  protected async checkDoneInitDatabase() {
    while (!this.doneInitDb) await sleep(200);
  }

  /**
   * Query Shadeless database to get the document with specified _id
   *
   * @function
   * @param {string} _id - The _id to query
   * @return {Promise<T | null | undefined>} The matched _id document
  */
  async queryId(_id: string): Promise<T | null | undefined> {
    const item = await this.db.getOne({_id});
    return item;
  }
}
