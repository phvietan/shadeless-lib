export enum FuzzStatus {
  TODO = 'todo',
  SCANNING = 'scanning',
  DONE = 'done',
  ANY = 'any',
}

export interface MongoItem {
  _id: string;
}