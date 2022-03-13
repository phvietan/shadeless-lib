import { BlacklistType, getOneProjectByName, Project } from "./project";

// Get filter by project for blacklist/whitelist
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

// Get filter by project for blacklist/whitelist
export async function getWlblFilter(choosingProject: string, isOptAll: boolean): Promise<any> {
  if (!isOptAll) {
    const project = await getOneProjectByName(choosingProject);
    const wlbl = getFilterByProjectForBW(project);
    return wlbl;
  } else return {};
}
