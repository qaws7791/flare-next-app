"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertGithubNodeToTreeNode } from "../lib/tree/transform";
import { TreeNode } from "../lib/tree/tree.types";
import { sortTree } from "../lib/tree/transform";
import githubApi from "../lib/github/api";
import CheckCircleIcon from "@/components/icons/check-circle-icon";
import CircleIcon from "@/components/icons/circle-icon";
import { useQuery } from "@tanstack/react-query";
import {
  githubBranchQueryOptions,
  githubRepoQueryOptions,
} from "@/feature/tree/queries/query-options";
import ProgressActivityIcon from "@/components/icons/progress-activity-icon";
import ErrorIcon from "@/components/icons/error-icon";
interface RepoType {
  id: number;
  name: string;
}

interface BranchType {
  name: string;
}

interface RepoListProps {
  onFetchSuccess?: (node: TreeNode[]) => void;
}

export default function RepoList({ onFetchSuccess }: RepoListProps) {
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const repoQuery = useQuery(githubRepoQueryOptions(selectedUser));
  const branchQuery = useQuery(
    githubBranchQueryOptions(selectedUser, selectedRepo)
  );

  const getGithubTree = async () => {
    if (!username || !selectedRepo || !selectedBranch) return;

    const res = await githubApi.fetchGitTree(
      username,
      selectedRepo,
      selectedBranch
    );

    const filteredNodes = res.data.tree as {
      path: string;
      mode: string;
      type: string;
      sha: string;
      size: number;
      url: string;
    }[];
    console.log("1. getGithubTree -> filteredNodes", filteredNodes);
    const tree = sortTree(convertGithubNodeToTreeNode(filteredNodes));
    console.log("2. getGithubTree -> tree", tree);
    onFetchSuccess?.(tree);
  };

  useEffect(() => {
    setSelectedRepo("");
  }, [selectedUser]);

  useEffect(() => {
    setSelectedBranch("");
  }, [selectedRepo]);

  return (
    <div className="p-4 border border-border flex flex-col gap-4">
      <div className="flex gap-2 ">
        <div className="flex items-center justify-center">
          {repoQuery.isError ? (
            <ErrorIcon className="w-6 h-6 text-red-600" />
          ) : selectedUser ? (
            <CheckCircleIcon className="w-6 h-6 text-primary" />
          ) : (
            <CircleIcon className="w-6 h-6 text-muted" />
          )}
        </div>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter github username"
          className={repoQuery.isError ? "border-red-600" : ""}
        />

        <Button
          variant="outline"
          onClick={() => {
            setSelectedUser(username);
          }}
        >
          Fetch Repos
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="flex items-center justify-center">
          {repoQuery.isFetching ? (
            <ProgressActivityIcon className="w-6 h-6 text-primary animate-spin" />
          ) : selectedRepo ? (
            <CheckCircleIcon className="w-6 h-6 text-primary" />
          ) : (
            <CircleIcon className="w-6 h-6 text-muted" />
          )}
        </div>
        <Select
          onValueChange={(value) => setSelectedRepo(value)}
          value={selectedRepo}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a repo" />
          </SelectTrigger>
          <SelectContent>
            {repoQuery.data?.repos.map((repo) => (
              <SelectItem key={repo.id} value={repo.name}>
                {repo.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <div className="flex items-center justify-center">
          {branchQuery.isFetching ? (
            <ProgressActivityIcon className="w-6 h-6 text-primary animate-spin" />
          ) : selectedBranch ? (
            <CheckCircleIcon className="w-6 h-6 text-primary" />
          ) : (
            <CircleIcon className="w-6 h-6 text-muted" />
          )}
        </div>
        <Select
          onValueChange={(value) => setSelectedBranch(value)}
          value={selectedBranch}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a branch" />
          </SelectTrigger>
          <SelectContent>
            {branchQuery.data?.data.map((branch) => (
              <SelectItem key={branch.name} value={branch.name}>
                {branch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={getGithubTree}>Fetch Project Tree</Button>
    </div>
  );
}
