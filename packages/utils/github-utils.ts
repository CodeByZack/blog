import { Octokit } from 'octokit';

const OWNER = 'CodeByZack';
const REPO = 'blog';

let octokitInstance: Octokit | null = null;

const init = (token : string) => {
  if (!octokitInstance) {
    octokitInstance = new Octokit({ auth: token });
  }
  return octokitInstance;
};

const getRepoFile = async (path: string) => {
  if (!octokitInstance) return null;
  const repo: any = await octokitInstance.rest.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path,
  });
  const decodeTxt = decodeURIComponent(escape(atob(repo.data.content)));
  return { content: decodeTxt, sha: repo.data.sha, path: repo.data.path };
};

const updateRepoFile = async (updateObj: any) => {
  if (!octokitInstance) return null;

  const { path, content, sha } = updateObj;
  console.log(updateObj);
  const encodeTxt = btoa(unescape(encodeURIComponent(content)));
  const params = {
    owner: OWNER,
    repo: REPO,
    path: path,
    sha: sha,
    content: encodeTxt,
    message: `${sha ? "modify" : "create" } ${path} by ${OWNER} at ${new Date().toLocaleString()}`,
  };
  const res = await octokitInstance.rest.repos.createOrUpdateFileContents(
    params,
  );
  return res;
};

const repoUtil = {
  init,
  getRepoFile,
  updateRepoFile,
};

export default repoUtil;
