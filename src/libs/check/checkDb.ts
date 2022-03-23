import {initDatabases} from '../repositories/init';

export async function checkDb(databaseUrl: string) {
  try {
    await initDatabases(databaseUrl);
  } catch (err) {
    throw new Error(`Cannot init mongodb database, check if you can connect with this connection string: ${databaseUrl}`);
  }
}
