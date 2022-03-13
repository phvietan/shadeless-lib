import fs from "fs/promises";
import path from "path";
import { PacketRequest } from "./databases/packet";
import { getHeaderMapFromHeaders } from "./helper";
import { AxiosRequestConfig, Method } from "./axiosTypes";
import { Config } from "./config";

export async function parsePacketToAxios(
  packet: PacketRequest,
  conf: Config,
): Promise<AxiosRequestConfig> {
  const body = await fs.readFile(
    path.join(conf.bodyDir, packet.project, packet.requestBodyHash),
    'utf-8',
  );
  return {
    method: packet.method as Method,
    params: packet.querystring,
    url: `${packet.origin}${packet.path}`,
    headers: getHeaderMapFromHeaders(packet.requestHeaders),
    data: body,
  };
}
