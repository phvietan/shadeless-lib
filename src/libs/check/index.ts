import {IConfig} from '../config';
import {checkDb} from './checkDb';
import {checkProject} from './checkProject';
import {checkRipgrep} from './checkRipgrep';

/**
 * Check if Shadeless can faithfully run
 *
 * @fuction
 * @param {IConfig} conf - Shadeless config
 */
export async function checker(conf: IConfig) {
  await checkDb(conf.databaseUrl);
  await checkProject(conf.choosingProject);
  await checkRipgrep();
}
