export interface TreeNode {
  id: string;
  name: string;
  parentId: string | null;
  type: "directory" | "file";
}

export interface DirectoryNode extends TreeNode {
  type: "directory";
}

export interface FileNode extends TreeNode {
  type: "file";
  content: string;
}

export interface CreateNode {
  name: string;
  parentId: string | null;
  type: "directory" | "file";
}

export interface GithubNode {
  path: string;
  mode: string;
  type: string;
}
