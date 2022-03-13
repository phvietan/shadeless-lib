import { Collection, Document } from 'mongodb';

export enum FuzzStatus {
  TODO = 'todo',
  SCANNING = 'scanning',
  DONE = 'done',
}

export interface ParsedPath {
  _id?: string;
  requestPacketId: string;
  origin: string;
  path: string;
  status: FuzzStatus;
  project: string;
  force: boolean;
  created_at?: Date;
  updated_at?: Date;
  error: string;
}

export var db: Collection<Document>;

// A very hacky way lol
export function assignDb(newDb: Collection<Document>) {
  db = newDb;
}

export async function update(query: any, value: any) {
  await db.updateMany(query, {
    $set: value,
  });
}

export async function get(choosingProject: string, lastFilter: any) {
  const documents = await db
    .find({
      project: choosingProject,
      ...lastFilter,
    })
    .sort({ created_at: 1 })
    .toArray();
  return documents as any as ParsedPath[];
}
