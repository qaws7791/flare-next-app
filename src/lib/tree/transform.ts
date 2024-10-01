import { isEqual } from "es-toolkit";
import { GithubNode, TreeNode } from "./tree.types";
export function convertTreeToMarkdownTree(tree: TreeNode[]): string {
  const rootNodes = tree.filter((node) => !node.parentId);
  const markdownTree = rootNodes.map((node) => {
    return convertNodeToMarkdown(node, tree, 0);
  });

  return markdownTree.join("\n");
}

function convertNodeToMarkdown(
  node: TreeNode,
  tree: TreeNode[],
  depth: number,
): string {
  const children = tree.filter((child) => child.parentId === node.id);
  const prefix = "#".repeat(depth + 1);
  const title = node.name;
  const childrenMarkdown = children.map((child) => {
    return convertNodeToMarkdown(child, tree, depth + 1);
  });

  return `${prefix} ${title}\n${childrenMarkdown.join("\n")}`;
}

export function convertGithubNodeToTreeNode(nodes: GithubNode[]): TreeNode[] {
  const treeNodes: {
    id: string;
    name: string;
    path: string[];
    parentId: string | null;
    type: "directory" | "file";
  }[] = nodes.map((node) => {
    const [name, ...path] = node.path.split("/").reverse();
    return {
      id: crypto.randomUUID(),
      name: name,
      path: path.reverse(),
      parentId: null,
      type: node.type === "blob" ? "file" : "directory",
    };
  });

  let i = 0;
  while (true) {
    treeNodes.map((node) => {
      if (node.path && node.path.length > i) {
        const parent = treeNodes.find((n) => {
          return (
            node.path[i] === n.name && isEqual(node.path.slice(0, i), n.path)
          );
        });
        if (parent) {
          node.parentId = parent.id;
        }
      }
    });

    const hasMore = treeNodes.some((node) => node.path.length > i);
    if (!hasMore) {
      break;
    }

    i++;
  }

  return treeNodes.map((node) => {
    return {
      id: node.id,
      name: node.name,
      parentId: node.parentId,
      type: node.type,
    };
  });
}

export function sortTree(nodes: TreeNode[]): TreeNode[] {
  return nodes.sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    }

    return a.type === "directory" ? -1 : 1;
  });
}
