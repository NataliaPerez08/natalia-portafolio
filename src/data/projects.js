import editorialProjects from './projects.catalog.js';
import githubProjects from './generated/github-projects.json';
import { mergeProjects } from './merge-projects.js';
export const projects = mergeProjects(editorialProjects, githubProjects);
export default projects;
