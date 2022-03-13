import { exec } from "@drstrain/drutil"

export async function grepRegexInDirectory(dir: string, val: string): Promise<string[]> {
  const { stdout } = await exec('rg', [
    '--files-with-matches',
    '--text',
    '--ignore-case',
    '--color',
    'never',
    '-e',
    val,
    dir,
  ]);
  return stdout.split('\n').map(line => line.slice(line.length - 64));
}
