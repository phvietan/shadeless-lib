import {BlacklistType, Project, projectRepo} from './project';

/**
 * Return the filter of project for blacklist/whitelist origins
 *
 * @function
 * @param {Project} project - Project to be applied whitelist/blacklist origin filter
 * @return {any} Whitelist/blacklist filter option
 */
function getFilterByProjectForBW(project: Project): any {
  const blacklistExact = project.blacklist.filter(
      (b) => b.type === BlacklistType.BLACKLIST_VALUE,
  );
  const blacklistRegex = project.blacklist.find(
      (b) => b.type === BlacklistType.BLACKLIST_REGEX,
  );

  const filter: any = {
    project: project.name,
    origin: {
      $nin: blacklistExact,
      $regex: project.whitelist,
    },
  };
  if (blacklistRegex) {
    filter.origin['$not'] = {
      $regex: blacklistRegex.value,
    };
  }
  return filter;
}

/**
 * Return the filter of project for blacklist/whitelist origins for project name
 *
 * @function
 * @param {string} choosingProject - The project to get blacklist/whitelist origins filter
 * @param {boolean} ignoreOption - An option to ignore the blacklist/whitelist origins filter feature
 * @return {Promise<any>} Whitelist/blacklist filter option
 */
export async function getWlblFilter(choosingProject: string, ignoreOption: boolean): Promise<any> {
  if (ignoreOption) return {};
  const project = await projectRepo.getOneProjectByName(choosingProject);
  if (!project) throw new Error(`Project name ${choosingProject} is not exist`);
  const wlbl = getFilterByProjectForBW(project);
  return wlbl;
}
