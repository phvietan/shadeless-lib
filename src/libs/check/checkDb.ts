import {initDatabases} from '../repositories/init';

/**
 * Check if database is able to connect
 *
 * @fuction
 * @param {string} databaseUrl - Database URL needed to initialize Shadeless library
 */
export async function checkDb(databaseUrl: string) {
  try {
    await initDatabases(databaseUrl);
  } catch (err) {
    throw new Error(`Cannot init mongodb database, check if you can connect with this connection string: ${databaseUrl}`);
  }
}
