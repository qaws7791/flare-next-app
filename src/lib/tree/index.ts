import { TreeNode } from "./tree.types";

/**
 *  Creates a new node with a random id
 * @param name - The name of the node
 * @param parentId - The id of the parent node
 * @param type - The type of the node (directory or file)
 * @returns The new node
 */
export function createNode({
  name,
  parentId,
  type,
}: Pick<TreeNode, "name" | "parentId" | "type">): TreeNode {
  const id = crypto.randomUUID();

  return {
    id,
    name,
    parentId,
    type,
  };
}

export function isRootNode(node: TreeNode) {
  return node.parentId === null;
}

export function buildTree(nodes: TreeNode[]): Record<string, TreeNode[]> {
  const tree: Record<string, TreeNode[]> = {};

  nodes.forEach((node) => {
    const parentId = node.parentId ?? "root";
    if (!tree[parentId]) {
      tree[parentId] = [];
    }
    tree[parentId].push(node);
  });

  return tree;
}

export function printTree(
  tree: Record<string, TreeNode[]>,
  parentId: string | null = "root",
  prefix: string = "",
): string {
  const children = tree[parentId ?? "root"] || [];
  let result = "";

  children.forEach((child, index) => {
    const isLast = index === children.length - 1;
    result += `${prefix}${isLast ? "└── " : "├── "}${
      child.type === "directory" ? "📁" : "📄"
    }${child.name}\n`;

    const newPrefix = prefix + (isLast ? "    " : "│   ");
    if (tree[child.id]) {
      result += printTree(tree, child.id, newPrefix);
    }
  });

  return result;
}

export function printMarkdownTree(
  tree: Record<string, TreeNode[]>,
  parentId: string | null = "root",
  indentLevel: number = 0,
): string {
  const children = tree[parentId ?? "root"] || [];
  let result = "";

  children.forEach((child) => {
    const indent = "  ".repeat(indentLevel); // Two spaces for each indent level
    result += `${indent}- ${child.type === "directory" ? "📁" : "📄"}${
      child.name
    }\n`;

    // Recursive call to process child nodes
    if (tree[child.id]) {
      result += printMarkdownTree(tree, child.id, indentLevel + 1);
    }
  });

  return result;
}
