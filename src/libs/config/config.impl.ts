import os from "os";
import path from "path";
import { IConfig } from "./config.interface";

export class Config implements IConfig {
  bodyDir: string = '';
  databaseUrl: string = '';
  choosingProject: string = '';
  shadelessApiPath: string = '';

  constructor(newConfig: Partial<IConfig>) {
    Object.assign(this, newConfig);

    this.shadelessApiPath = this.shadelessApiPath || path.join(os.homedir(), 'go/src/shadeless-api');
    this.databaseUrl = this.databaseUrl || 'mongodb://localhost:27017';
    this.bodyDir = this.bodyDir || path.join(this.shadelessApiPath, 'files');
    this.choosingProject = this.choosingProject || '';

  }

  getFilesLocation(): string {
    const filesLocation = path.join(this.shadelessApiPath, 'files', this.choosingProject);
    return filesLocation;
  }
}
