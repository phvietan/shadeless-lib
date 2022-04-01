import {MongoClient} from 'mongodb';
import {projectRepo} from './project';
import {toolNoteRepo} from './toolNote';
import {parsedPathRepo} from './parsedPath';
import {parsedPacketRepo} from './parsedPacket';

/**
 * Initialize databases connection for Shadeless library
 *
 * @fuction
 * @param {string} databaseUrl - Database URL needed to initialize Shadeless library
 */
export async function initDatabases(databaseUrl: string) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(reject, 5000);
    MongoClient.connect(databaseUrl, function(err, db) {
      if (err || !db) return reject(err);
      const dbo = db.db('shadeless');
      projectRepo.setDb(dbo.collection('projects'));
      toolNoteRepo.setDb(dbo.collection('tool_notes'));
      parsedPathRepo.setDb(dbo.collection('parsed_paths'));
      parsedPacketRepo.setDb(dbo.collection('parsed_packets'));
      resolve();
    });
  });
}
