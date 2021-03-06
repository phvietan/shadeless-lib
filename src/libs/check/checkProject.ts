import {projectRepo} from '../repositories/project';

/**
 * Check if the choosing project is available
 *
 * @fuction
 * @param {string} choosingProject - The name of choosing project
 */
export async function checkProject(choosingProject: string) {
  if (choosingProject === '') {
    throw new Error('You have not chosen a project!');
  } else {
    const allProjects = await projectRepo.getMany();
    const allProjectNames = allProjects.map((p) => p.name);
    if (!allProjectNames.includes(choosingProject)) {
      throw new Error(`Project ${choosingProject} is not available! Available projects are: ${JSON.stringify(allProjectNames)}`);
    }
  }
}
