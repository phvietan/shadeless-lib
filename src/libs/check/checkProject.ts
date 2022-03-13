import { projectRepo } from "../repositories/project";

export async function checkProject(choosingProject: string) {
  if (choosingProject === '') {
    throw new Error('You have not chosen a project!');
  } else {
    const allProjects = await projectRepo.get();
    const allProjectNames = allProjects.map(p => p.name);
    if (!allProjectNames.includes(choosingProject)) {
      throw new Error(`Project ${choosingProject} is not available! Available projects are: ${JSON.stringify(allProjectNames)}`);
    }
  }
}
