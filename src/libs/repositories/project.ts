import {Repository} from './repository';
import {MongoItem} from './status';

/**
 * Status enum for Project documents
 *
 * @enum {string} ProjectStatus
 * @property TODO - Indicates "todo" status
 * @property SCANNING - Indicates "scanning" status
 * @property DONE - Indicates "done" status
 */
export enum ProjectStatus {
  TODO = 'todo',
  HACKING = 'hacking',
  DONE = 'done',
}

/**
 * BlacklistType enum for Project blacklist matching
 *
 * @enum {string} BlacklistType
 * @property BLACKLIST_REGEX - Indicates "regex" matching
 * @property BLACKLIST_VALUE - Indicates "value" matching
 */
export enum BlacklistType {
  BLACKLIST_REGEX = 'regex',
  BLACKLIST_VALUE = 'value',
}

/**
 * Blacklist type for Project blacklist matching
 *
 * @type
 */
export type Blacklist = {
  value: string;
  type: BlacklistType;
};

/**
 * Project interface is document for collection "projects" in Shadeless DB
 *
 * This collection is used for storing project
 *
 * @interface Project
 * @property name - Project name
 * @property description - Project description
 * @property status - Project status
 * @property blacklist - blacklist array for removing unwanted origins
 * @property whitelist - whitelist string for showing only wanted origins in regex
 */
export interface Project extends MongoItem {
  name: string;
  description: string;
  status: ProjectStatus;
  blacklist: Blacklist[];
  whitelist: '';
}

/**
 * ProjectRepository class for querying "projects" collection in Shadeless DB
 *
 * @class
 */
class ProjectRepository extends Repository<Project> {
  /**
   * Get one project based on project name
   *
   * @function
   * @param {string} projectName - the project name to query
   */
  async getOneProjectByName(projectName: string): Promise<Project | undefined> {
    const document = await this.getOne({name: projectName});
    if (!document) return undefined;
    return document as any as Project;
  }
}

export const projectRepo = new ProjectRepository();


