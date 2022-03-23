import {MongoClient} from 'mongodb';
import {parsedPathRepo} from './parsedPath';
import {parsedPacketRepo} from './parsedPacket';
import {projectRepo} from './project';

export async function initDatabases(databaseUrl: string) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(reject, 5000);
    MongoClient.connect(databaseUrl, function(err, db) {
      if (err || !db) return reject(err);
      const dbo = db.db('shadeless');
      projectRepo.setDb(dbo.collection('projects'));
      parsedPathRepo.setDb(dbo.collection('parsed_paths'));
      parsedPacketRepo.setDb(dbo.collection('parsed_packets'));
      resolve();
    });
  });
}
