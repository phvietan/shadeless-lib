/* eslint-disable no-unused-vars */
import {Repository} from './repository';

export enum ProjectStatus {
  TODO = 'todo',
  HACKING = 'hacking',
  DONE = 'done',
}
export enum BlacklistType {
  BLACKLIST_REGEX = 'regex',
  BLACKLIST_VALUE = 'value',
}
export type Blacklist = {
  value: string;
  type: BlacklistType;
};

export interface Project {
  _id?: string;
  created_at?: Date;
  updated_at?: Date;
  name: string;
  description: string;
  status: ProjectStatus;
  blacklist: Blacklist[];
  whitelist: '';
}

class ProjectRepository extends Repository<Project> {
  async getOneProjectByName(projectName: string): Promise<Project | undefined> {
    const document = await this.db.findOne({name: projectName});
    if (!document) return undefined;
    return document as any as Project;
  }
};

export const projectRepo = new ProjectRepository();


