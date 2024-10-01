import octokit from "./client";

const githubApi = {
  fetchRepos,
  fetchBranches,
  fetchGitTree,
};

export function fetchRepos(username: string) {
  return octokit.request("GET /users/{username}/repos", {
    username: username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export function fetchBranches(username: string, repo: string) {
  return octokit.request("GET /repos/{owner}/{repo}/branches", {
    owner: username,
    repo: repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export function fetchGitTree(username: string, repo: string, branch: string) {
  return octokit.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
    owner: username,
    repo: repo,
    tree_sha: branch,
    recursive: "true",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export default githubApi;
