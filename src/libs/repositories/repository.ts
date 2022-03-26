import {Collection, DeleteResult, Document, InsertOneResult, UpdateResult} from 'mongodb';
import {MongoItem} from './status';

export interface IRepository<T extends MongoItem> {
  setDb: (newDb: Collection<Document>) => void;
  update: (query: any, value: any) => Promise<UpdateResult>;
  getMany: (filter: any) => Promise<T[]>;
  getOne: (filter: any) => Promise<T | null | undefined>;
  insertOne: (newVal: T) => Promise<InsertOneResult<Document>>;
  removeMany: (filter: any) => Promise<DeleteResult>;
  removeOne: (filter: any) => Promise<DeleteResult>;
}

export class Repository<T extends MongoItem> implements IRepository<T> {
  private db: Collection<Document> = {} as Collection<Document>;

  setDb(newDb: Collection<Document>) {
    this.db = newDb;
  }

  async update(query: any, value: any): Promise<UpdateResult> {
    return this.db.updateOne(query, {
      $set: value,
    });
  }

  async getMany(filter: any = {}) {
    const documents = await this.db
        .find(filter)
        .sort({created_at: -1})
        .toArray();
    return (documents as unknown) as T[];
  }

  async getOne(filter: any = {}) {
    return new Promise<T | null | undefined>((resolve, reject) => {
      this.db.findOne(filter, (err, result) => {
        if (err) return reject(err);
        resolve((result as unknown) as (T | null | undefined));
      });
    });
  }

  async insertOne(newVal: T) {
    return this.db.insertOne(newVal as any);
  }

  async removeMany(filter: any) {
    return this.db.deleteMany(filter);
  }

  async removeOne(filter: any) {
    return this.db.deleteOne(filter);
  }
}
