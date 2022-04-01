import {IConfig} from '../config';
import {FuzzStatus} from '../repositories';
import {getWlblFilter} from '../repositories/getWlblFilter';
import {ParsedPath, parsedPathRepo} from '../repositories/parsedPath';
import {ParsedItemQL} from './parsedItemQL';
import {IQueryLanguage} from './queryLanguage';

/**
 * PathQL class helps querying collection "parsed_paths" easier in Shadeless DB
 *
 * @class PathQL
 */
export class PathQL extends ParsedItemQL<ParsedPath> implements IQueryLanguage<ParsedPath> {
  private status: FuzzStatus = FuzzStatus.ANY;

  /**
   * Constructor to create PathQL
   *
   * @constructor
   * @param {Partial<IConfig>} inputConfig - Shadeless's config
  */
  constructor(inputConfig: Partial<IConfig>) {
    super(parsedPathRepo, inputConfig);
  }

  /**
   * Set fuzz status. For querying documents with the fuzz status setted value
   *
   * @function
   * @param {FuzzStatus} newStatus - fuzz status to be setted
   * @return {this} this
  */
  public setStatus(newStatus: FuzzStatus): this {
    this.status = newStatus;
    return this;
  }

  /**
   * Get the filter of the setted value of fuzz status
   *
   * @private @function
   * @return {any} The filter parsed from fuzz status
  */
  private getStatusAsFilter(): any {
    if (this.status === FuzzStatus.ANY) return {};
    return {status: this.status};
  }

  /**
   * Query Shadeless database to get ParsedPath documents that matched all specified properties
   *
   * @param {any} lastFilter - The last filter to be applied right before querying
   * @return {Promise<ParsedPath[]>} List of matched ParsedPath documents
   *
  */
  async query(lastFilter: any = {}): Promise<ParsedPath[]> {
    await this.checkDoneInitDatabase();
    const filter = {
      ...this.getStatusAsFilter(),
      ...await getWlblFilter(this.config.choosingProject, this.all),
      ...lastFilter,
    };
    const listPaths = await this.db.getMany(filter);
    return listPaths;
  }
}
