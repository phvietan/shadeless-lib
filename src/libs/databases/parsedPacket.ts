import { Collection, Document } from 'mongodb';
import { Packet } from './packet';
import { FuzzStatus } from './parsedPath';

export interface ParsedPacket extends Packet {
  hash: string;
  result: string[];
  status: FuzzStatus;
  staticScore: number;
  logDir: string;
}

export var db: Collection<Document>;

// A very hacky way lol
export function assignDb(newDb: Collection<Document>) {
  db = newDb;
}

export async function getOneByRequestId(requestPacketId: string) {
  const document = await db.findOne({ requestPacketId });
  if (!document) return undefined;
  return document as any as ParsedPacket;
}

export async function update(query: any, value: any) {
  await db.updateOne(query, {
    $set: value,
  });
}

export async function get(choosingProject: string, filter: any) {
  const documents = await db
    .find({
      ...filter,
      project: choosingProject,
    })
    .sort({ created_at: 1 })
    .toArray();
  return documents as any as ParsedPacket[];
}

export async function getPacketsByFilter(filter: any) {
  const documents = await db.find(filter).toArray();
  return documents as any as ParsedPacket[];
}
