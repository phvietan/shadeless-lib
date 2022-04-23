import {exec} from '@drstrain/drutil';

const FILE_NAME_LENGTH = 64;

/**
 * Run ripgrep with value `val` in specified directory
 *
 * @function
 * @param {string} directory - The directory that will run ripgrep
 * @param {string} regexValue - The regex value to search for
 * @return {string} The location of request/response body
 */
export async function grepRegexInDirectory(directory: string, regexValue: string): Promise<string[]> {
  const {stdout} = await exec('rg', [
    '--files-with-matches',
    '--text',
    '--ignore-case',
    '--color',
    'never',
    '-e',
    regexValue,
    directory,
  ]);
  return stdout.split('\n').map((line) => line.slice(line.length - FILE_NAME_LENGTH));
}
