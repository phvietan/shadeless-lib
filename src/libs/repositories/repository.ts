import {Collection, DeleteResult, Document, InsertOneResult, UpdateResult} from 'mongodb';
import {MongoItem} from './status';

/**
 * Interface for Repository classes for querying collection in Shadeless DB
 *
 * @interface IRepository
 */
export interface IRepository<T extends MongoItem> {
  setDb: (newDb: Collection<Document>) => void;
  update: (query: any, value: any) => Promise<UpdateResult>;
  getMany: (filter: any) => Promise<T[]>;
  getOne: (filter: any) => Promise<T | null | undefined>;
  insertOne: (newVal: T) => Promise<InsertOneResult<Document>>;
  removeMany: (filter: any) => Promise<DeleteResult>;
  removeOne: (filter: any) => Promise<DeleteResult>;
}

/**
 * Prototype of Repository classes for querying collection in Shadeless DB
 *
 * @class Repository
 * @implements {IRepository}
 */
export class Repository<T extends MongoItem> implements IRepository<T> {
  private db: Collection<Document> = {} as Collection<Document>;

  /**
   * Set Shadeless's collection object
   *
   * @function
   * @param {Collection<Document>} newDb
   */
  setDb(newDb: Collection<Document>) {
    this.db = newDb;
  }

  /**
   * Call update on documents in Shadeless DB
   *
   * @function
   * @param {any} filter - The filter used to select the documents to update
   * @param {any} value - The value object that will be applied to documents
  */
  async update(filter: any, value: any): Promise<UpdateResult> {
    return this.db.updateOne(filter, {
      $set: value,
    });
  }

  /**
   * Get many documents in Shadeless DB using filter
   *
   * @function
   * @param {any} filter - The filter used to select the documents [DEFAULT={}]
  */
  async getMany(filter: any = {}) {
    const documents = await this.db
        .find(filter)
        .sort({created_at: -1})
        .toArray();
    return (documents as unknown) as T[];
  }

  /**
   * Get one document in Shadeless DB using filter
   *
   * @function
   * @param {any} filter - The filter used to select one document [DEFAULT={}]
  */
  async getOne(filter: any = {}) {
    return new Promise<T | null | undefined>((resolve, reject) => {
      this.db.findOne(filter, (err, result) => {
        if (err) return reject(err);
        resolve((result as unknown) as (T | null | undefined));
      });
    });
  }

  /**
   * Insert one document into Shadeless DB
   *
   * @function
   * @param {T} newVal - New value that will be inserted into Shadeless DB
  */
  async insertOne(newVal: T) {
    return this.db.insertOne(newVal as any);
  }

  /**
   * Remove many documents from Shadeless DB using filter
   *
   * @function
   * @param {any} filter - The filter used to delete documents
  */
  async removeMany(filter: any) {
    return this.db.deleteMany(filter);
  }

  /**
   * Remove one document from Shadeless DB using filter
   *
   * @function
   * @param {any} filter - The filter used to delete one document
  */
  async removeOne(filter: any) {
    return this.db.deleteOne(filter);
  }
}
