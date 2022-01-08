const { Octokit } = require('octokit');

const OWNER = 'CodeByZack';
const REPO = 'blog';

let octokitInstance = null;

const init = (token) => {
  if (!octokitInstance) {
    octokitInstance = new Octokit({ auth: token });
  }
  return octokitInstance;
};

const getRepoFile = async (path) => {
  const repo = await octokitInstance.rest.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path
  });
  const decodeTxt = decodeURIComponent(escape(atob(repo.data.content)));
  return { content: decodeTxt, sha: repo.data.sha, path: repo.data.path };
};

const updateRepoFile = async (updateObj) => {
  const { path, content, sha } = updateObj;
  console.log(updateObj);
  const encodeTxt = btoa(unescape(encodeURIComponent(content)));
  const params = {
    owner: OWNER,
    repo: REPO,
    path: path,
    sha: sha,
    content: encodeTxt,
    message: `modify ${path} by ${OWNER} at ${new Date().toLocaleString()}`
  };

  const res = await octokitInstance.rest.repos.createOrUpdateFileContents(
    params
  );
};

const repoUtil = {
  init,
  getRepoFile,
  updateRepoFile
};

export default repoUtil;
