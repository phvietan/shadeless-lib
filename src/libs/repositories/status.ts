/**
 * Status enum for recon/fuzzing work
 *
 * @enum {string} FuzzStatus
 * @property TODO - Indicates "todo" status
 * @property SCANNING - Indicates "scanning" status
 * @property DONE - Indicates "done" status
 * @property ANY - Indicates "any" status, for QL classes to query any FuzzStatus in Shadeless DB
 */
export enum FuzzStatus {
  TODO = 'todo',
  SCANNING = 'scanning',
  DONE = 'done',
  ANY = 'any',
}

/**
 * MongoItem interface is prototype of Shadeless documents
 *
 * @interface MongoItem
 * @property _id - The id of document
 * @property created_at - The creation time of document
 * @property updated_at - The updated time of document
 */
export interface MongoItem {
  _id?: string;
  created_at?: Date;
  updated_at?: Date;
}