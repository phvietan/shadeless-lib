import fs from 'fs';
import path from 'path';
import { formatDate } from '@drstrain/drutil';

export function getHeaderMapFromHeaders(
  headers: string[],
): Record<string, string> {
  const result: Record<string, string> = {};
  headers.forEach((header) => {
    const delimiter = header.indexOf(': ');
    if (delimiter === -1) return;
    const key = header.slice(0, delimiter);
    const value = header.slice(delimiter + 2);
    if (key.toLowerCase() === 'content-length') return;
    result[key] = value;
  });
  return result;
}

export function getHeaders(headers: string[]): string {
  return headers.slice(1).reduce((before, header) => {
    if (header.toLowerCase().includes('content-length')) return before;
    return before + header + '\n';
  });
}

function fileExist(fileName: string): boolean {
  return fs.existsSync(path.join(process.cwd(), fileName));
}

export function getNextResultLocation(): string {
  const prefix = formatDate(new Date()).replace(' ', '-');
  let L = 1;
  let R = 100;
  while (fileExist(`${prefix}_${R}.txt`)) {
    R *= 10;
  }
  let result = R;
  while (L <= R) {
    const M = Math.floor((L + R) / 2);
    if (fileExist(`${prefix}_${M}.txt`)) {
      L = M + 1;
    } else {
      result = M;
      R = M - 1;
    }
  }
  return `${prefix}_${result}.txt`;
}
