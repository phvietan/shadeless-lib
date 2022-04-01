/* eslint-disable jsdoc/require-jsdoc */
import {getWlblFilter} from '../repositories/getWlblFilter';
import {parsedPacketRepo} from '../repositories/parsedPacket';
import {ParsedItemQL} from './parsedItemQL';
import {ParsedPacket} from '../repositories/parsedPacket';
import {grepRegexInDirectory} from '../grepper/grepRegexInDirectory';
import {IConfig} from '../config';
import {IQueryLanguage} from '../queryLanguages/queryLanguage';

/**
 * PacketQL class helps querying collection "parsed_packets" easier in Shadeless DB
 *
 * @class PacketQL
 */
export class PacketQL extends ParsedItemQL<ParsedPacket> implements IQueryLanguage<ParsedPacket> {
  private threshold: number = 50;
  private body: string = '';
  private reqHeader: string = '';
  private resHeader: string = '';
  private header: string = '';

  /**
   * Constructor to create PacketQL
   *
   * @constructor
   * @param {Partial<IConfig>} inputConfig - Shadeless's config
  */
  constructor(inputConfig: Partial<IConfig>) {
    super(parsedPacketRepo, inputConfig);
  }

  /**
   * Set search value of staticScore threshold. For querying documents with staticScore less than the setted value
   *
   * @function
   * @param {number} newThreshold - threshold value to be setted
   * @return {this} this
  */
  public setThreshold(newThreshold: number): this {
    this.threshold = newThreshold;
    return this;
  }

  /**
   * Set search value of body value. For querying documents that has request's body or response's body match as REGEX with the setted value
   *
   * @function
   * @param {string} newBody - body value to be regex matched
   * @return {this} this
  */
  public setBody(newBody: string): this {
    this.body = newBody;
    return this;
  }

  /**
   * Set search value for headers. For querying documents that has request's headers or response's headers match as REGEX with the setted value
   *
   * @function
   * @param {string} newHeader - header value to be regex matched
   * @return {this} this
  */
  public setHeader(newHeader: string): this {
    this.header = newHeader;
    return this;
  }

  /**
   * Set search value for request's headers. For querying documents that has request's headers match as REGEX with the setted value
   *
   * @function
   * @param {string} newReqHeader - request's header value to be regex matched
   * @return {this} this
  */
  public setRequestHeader(newReqHeader: string): this {
    this.reqHeader = newReqHeader;
    return this;
  }

  /**
   * Set search value for response's headers. For querying documents that has response's headers match as REGEX with the setted value
   *
   * @function
   * @param {string} newResHeader - response's header value to be regex matched
   * @return {this} this
  */
  public setResponseHeader(newResHeader: string): this {
    this.resHeader = newResHeader;
    return this;
  }

  /**
   * Query Shadeless database to get documents that matched the threshold, headers, white/blacklisted origins
   *
   * @private @function
   * @param {any} filter - last filter to be applied before querying
  */
  private async getThresholdMatched(filter: any) {
    const thresholdFilter = {
      staticScore: {$lte: this.threshold},
      ...await getWlblFilter(this.config.choosingProject, this.all),
      $or: [{
        requestHeaders: {
          $regex: this.header,
          $options: 'i',
        },
      },
      {
        responseHeaders: {
          $regex: this.header,
          $options: 'i',
        },
      }],
      requestHeaders: {
        $regex: this.reqHeader,
        $options: 'i',
      },
      responseHeaders: {
        $regex: this.resHeader,
        $options: 'i',
      },
      ...filter,
    };
    return this.db.getMany(thresholdFilter);
  }

  /**
   * Query Shadeless database to get documents that matched the threshold, headers, white/blacklisted origins
   *
   * @private @function
   * @param {string[]} matchedIds - last filter to be applied before querying
   * @param {ParsedPacket[]} packets - last filter to be applied before querying
   * @return {ParsedPacket[]}
   *
  */
  private filterPacketsByBodyId(matchedIds: string[], packets: ParsedPacket[]): ParsedPacket[] {
    const setMatchedId: Set<string> = new Set();
    matchedIds.forEach((id) => setMatchedId.add(id));
    return packets.filter((p) => setMatchedId.has(p.requestBodyHash) || setMatchedId.has(p.responseBodyHash));
  }

  /**
   * Query Shadeless database to get ParsedPacket documents that matched all specified properties
   *
   * @param {any} filter - The last filter to be applied right before querying
   * @return {Promise<ParsedPacket[]>} List of matched ParsedPacket documents
   *
  */
  async query(filter: any = {}): Promise<ParsedPacket[]> {
    await this.checkDoneInitDatabase();
    const thresholdPackets = await this.getThresholdMatched(filter);

    // Speed up if body is empty, do not need to filter more
    if (this.body === '') return thresholdPackets;

    const matchedBodyId = await grepRegexInDirectory(this.config.getFilesLocation(), this.body);
    const filterBodyPackets = this.filterPacketsByBodyId(matchedBodyId, thresholdPackets);
    return filterBodyPackets;
  }
}
