import os from 'os';
import path from 'path';

/**
 * Interface for Shadeless Config
 *
 * @interface IConfig
 * @property bodyDir - The directory that contains Shadeless body
 * @property databaseUrl - The url to connect to MongoDB
 * @property choosingProject - The project that is going to be queried
 * @property shadelessPath - The directory of shadeless
 */
export interface IConfig {
  bodyDir: string;
  databaseUrl: string;
  shadelessPath: string;
  choosingProject: string;
}

/**
 * Shadeless Config to run Shadeless library
 *
 * @class Config
 * @implements {IConfig}
 */
export class Config implements IConfig {
  bodyDir: string = '';
  databaseUrl: string = '';
  choosingProject: string = '';
  shadelessPath: string = '';

  /**
   * Constructor to create PacketQL
   *
   * @constructor
   * @param {Partial<IConfig>} newConfig - Input Shadeless's config to run library
   */
  constructor(newConfig: Partial<IConfig>) {
    Object.assign(this, newConfig);

    this.shadelessPath = this.shadelessPath || path.join(os.homedir(), 'go/src/shadeless-api');
    this.databaseUrl = this.databaseUrl || 'mongodb://localhost:27017';
    this.bodyDir = this.bodyDir || path.join(this.shadelessPath, 'files');
    this.choosingProject = this.choosingProject || '';
  }

  /**
   * Get the location where Shadeless stores request/response body
   *
   * @function
   * @return {string} The location of request/response body
   */
  getFilesLocation(): string {
    const filesLocation = path.join(this.bodyDir, this.choosingProject);
    return filesLocation;
  }
}
