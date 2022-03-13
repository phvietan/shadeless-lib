import { Collection, Document } from 'mongodb';

export enum ProjectStatus {
  TODO = 'todo',
  HACKING = 'hacking',
  DONE = 'done',
}
export enum BlacklistType {
  BLACKLIST_REGEX = 'regex',
  BLACKLIST_VALUE = 'value',
}
export type Blacklist = {
  value: string;
  type: BlacklistType;
};

export interface Project {
  _id?: string;
  created_at?: Date;
  updated_at?: Date;
  name: string;
  description: string;
  status: ProjectStatus;
  blacklist: Blacklist[];
  whitelist: '';
}

export var db: Collection<Document>;

// A very hacky way lol
export function assignDb(newDb: Collection<Document>) {
  db = newDb;
}

export async function getAllProjects(): Promise<Project[]> {
  const document = await db.find().toArray();
  if (!document) return [] as Project[];
  return document as any as Project[];
}

export async function getOneProjectByName(projectName: string): Promise<Project | undefined> {
  const document = await db.findOne({ name: projectName });
  if (!document) return undefined;
  return document as any as Project;
}
