import { fetchBranches, fetchRepos } from "@/lib/github/api";
import { queryOptions } from "@tanstack/react-query";

export function githubRepoQueryOptions(username: string) {
  return queryOptions({
    queryKey: ["user", username, "repos"],
    queryFn: () => fetchRepos(username),
    enabled: !!username,
    select: (data) => {
      return {
        username,
        repos: data.data.map((repo) => {
          return {
            id: repo.id,
            name: repo.name,
          };
        }),
      };
    },
  });
}

export function githubBranchQueryOptions(username: string, repo: string) {
  return queryOptions({
    queryKey: ["user", username, "repo", repo, "branches"],
    queryFn: () => fetchBranches(username, repo),
    enabled: !!repo && !!username,
  });
}
