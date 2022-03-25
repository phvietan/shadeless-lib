import {getWlblFilter} from '../repositories/getWlblFilter';
import {parsedPacketRepo} from '../repositories/parsedPacket';
import {ParsedItemQL} from './parsedItemQL';
import {ParsedPacket} from '../repositories/parsedPacket';
import {grepRegexInDirectory} from '../grepper/grepRegexInDirectory';
import {IConfig} from '../config';
import {IQueryLanguage} from '../queryLanguages/queryLanguage';

export class PacketQL extends ParsedItemQL<ParsedPacket> implements IQueryLanguage<ParsedPacket> {
  private threshold: number = 50;
  private body: string = '';
  private reqHeader: string = '';
  private resHeader: string = '';
  private header: string = '';

  constructor(inputConfig: Partial<IConfig>) {
    super(parsedPacketRepo, inputConfig);
  }

  public setThreshold(newThreshold: number) {
    this.threshold = newThreshold;
    return this;
  }
  public setBody(newBody: string) {
    this.body = newBody;
    return this;
  }
  public setHeader(newHeader: string) {
    this.header = newHeader;
    return this;
  }
  public setRequestHeader(newReqHeader: string) {
    this.reqHeader = newReqHeader;
    return this;
  }
  public setResponseHeader(newResHeader: string) {
    this.resHeader = newResHeader;
    return this;
  }

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

  private filterPacketsByBodyId(matchedIds: string[], packets: ParsedPacket[]): ParsedPacket[] {
    const setMatchedId: Set<string> = new Set();
    matchedIds.forEach((id) => setMatchedId.add(id));
    return packets.filter((p) => setMatchedId.has(p.requestBodyHash) || setMatchedId.has(p.responseBodyHash));
  }

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
