import { Collection, Document, UpdateResult } from "mongodb";

export interface IRepository<T> {
  setDb: (newDb: Collection<Document>) => void;
  update: (query: any, value: any) => Promise<UpdateResult>;

  get: (filter: any) => Promise<T[]>;
  getByProjectName: (choosingProject: string, filter: any) => Promise<T[]>;
}

export class Repository<T> implements IRepository<T> {
  protected db: Collection<Document> = {} as Collection<Document>;

  setDb(newDb: Collection<Document>) {
    this.db = newDb;
  }

  async update(query: any, value: any): Promise<UpdateResult> {
    return this.db.updateOne(query, {
      $set: value,
    });
  }

  async get(filter: any = {}) {
    const documents = await this.db.find(filter).toArray();
    return documents as any as T[];
  }

  async getByProjectName(projectName: string, filter: any = {}) {
    const documents = await this.db
      .find({
        project: projectName,
        ...filter,
      })
      .sort({ created_at: 1 })
      .toArray();
    return documents as any as T[];
  }
}
