import { IConfig } from '../config';
import { checkDb } from './checkDb';
import { checkProject } from './checkProject';
import { checkRipgrep } from './checkRipgrep';

export async function checker(conf: IConfig) {
  try {
    await checkDb(conf.databaseUrl);
    await checkProject(conf.choosingProject);
    await checkRipgrep();
  } catch (err) {
    throw err;
  }
}
