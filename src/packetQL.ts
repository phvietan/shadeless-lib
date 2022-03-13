import { getWlblFilter } from "./libs/repositories/getWlblFilter";
import { parsedPacketRepo } from "./libs/repositories/parsedPacket";
import { IQueryLanguage, QueryLanguage } from "./queryLanguage";
import { ParsedPacket } from "./libs/repositories/parsedPacket";
import { grepRegexInDirectory } from "./libs/grepper/grepRegexInDirectory";

export class PacketQL extends QueryLanguage implements IQueryLanguage<ParsedPacket> {

  protected threshold: number = 50;
  protected body: string = '';
  protected header: string = '';

  public setThreshold(newThreshold: number): PacketQL {
    this.threshold = newThreshold;
    return this;
  }
  public setBody(newBody: string): PacketQL {
    this.body = newBody;
    return this;
  }
  public setHeader(newHeader: string): PacketQL {
    this.header = newHeader;
    return this;
  }

  private async getThresholdMatched(lastFilter: any) {
    const thresholdFilter = {
      ...this.getStatusAsFilter(),
      staticScore: { $lte: this.threshold },
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
      ...this.filter,
      ...lastFilter,
    };
    return parsedPacketRepo.get(thresholdFilter);
  }

  private filterPacketsByBodyId(matchedIds: string[], packets: ParsedPacket[]): ParsedPacket[] {
    const setMatchedId: Set<string> = new Set();
    matchedIds.forEach((id) => setMatchedId.add(id));
    return packets.filter(p => setMatchedId.has(p.requestBodyHash) || setMatchedId.has(p.responseBodyHash));
  }


  async query(lastFilter: any = {}): Promise<ParsedPacket[]> {
    await this.checkDoneInitDatabase();

    const thresholdPackets = await this.getThresholdMatched(lastFilter);
    const matchedBodyId = await grepRegexInDirectory(this.config.getFilesLocation(), this.body);
    const filterBodyPackets = this.filterPacketsByBodyId(matchedBodyId, thresholdPackets);

    return filterBodyPackets;
  }
}
