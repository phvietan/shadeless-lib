import { errorLog, exec, successLog } from "@drstrain/drutil";

export async function checkRipgrep() {
  const { err } = await exec('rg', ['--version']);
  if (err) {
    throw new Error('Found ripgrep not installed, please install it at https://github.com/BurntSushi/ripgrep')
  } else {
    successLog('Found ripgrep installed');
  }
}
