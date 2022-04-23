import {exec} from '@drstrain/drutil';

/**
 * Check if ripgrep is installed
 *
 * @fuction
 */
export async function checkRipgrep() {
  const {err} = await exec('rg', ['--version']);
  if (err) {
    throw new Error('Found ripgrep not installed, please install it at https://github.com/BurntSushi/ripgrep');
  }
}
