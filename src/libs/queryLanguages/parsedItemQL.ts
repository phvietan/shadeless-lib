import {FuzzStatus, MongoItem} from '../repositories/status';
import {QueryLanguage} from './queryLanguage';

/**
 * ParsedItemQL class helps defining shared methods of PathQL and PacketQL
 *
 * @class PathQL
 */
export class ParsedItemQL<T extends MongoItem> extends QueryLanguage<T> {
  protected all: boolean = false;

  /**
   * Set all option. For ignoring the whitelist/blacklist origins feature, setting this option will cause QL to query for all origins in current project
   *
   * @function
   * @param {boolean} newAll - response's header value to be regex matched
   * @return {this} this
  */
  public setAll(newAll: boolean): this {
    this.all = newAll;
    return this;
  }

  /**
   * Query Shadeless database to get the document with specified requestPacketId
   *
   * @function
   * @param {string} requestPacketId - The requestPacketId to query
   * @return {Promise<T | null | undefined>} The matched requestPacketId document
  */
  async queryRequestPacketId(requestPacketId: string): Promise<T | null | undefined> {
    const item = await this.db.getOne({requestPacketId});
    return item;
  }

  /**
   * Update Shadeless DB to set the input item as "DONE"
   *
   * @param {T} item - The input item to be setted
   *
  */
  async setQueryDone(item: T): Promise<void> {
    await this.checkDoneInitDatabase();
    await this.db.update({_id: item._id}, {
      status: FuzzStatus.DONE,
    });
  }

  /**
   * Update Shadeless DB to set the input item as "TODO"
   *
   * @param {T} item - The input item to be setted
   *
  */
  public async setQueryTodo(item: T): Promise<void> {
    await this.checkDoneInitDatabase();
    await this.db.update({_id: item._id}, {
      status: FuzzStatus.TODO,
    });
  }
}
