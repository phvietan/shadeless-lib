import { MongoClient, Db } from "mongodb";
import { assignDb as assignParsedPacket } from './parsedPacket';
import { assignDb as assignParsedPath } from './parsedPath';
import { assignDb as assignProject } from './project';

export var dbo: Db | undefined = undefined;

export async function initDatabases(databaseUrl: string) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(reject, 5000);
    MongoClient.connect(databaseUrl, function (err, db) {
      if (err || !db) return reject(err);
      dbo = db.db('shadeless');
      assignParsedPacket(dbo.collection('parsed_packets'));
      assignParsedPath(dbo.collection('parsed_paths'));
      assignProject(dbo.collection('projects'));
      resolve();
    });
  });
}
