"use client";
import { createContext, useContext, useState } from "react";
import { createNode } from "../../../lib/tree";
import { CreateNode, TreeNode } from "../../../lib/tree/tree.types";

interface TreeProviderProps {
  initialTree?: TreeNode[];
}

interface TreeProvider {
  tree: TreeNode[];
  appendNode: (node: CreateNode) => TreeNode;
  removeNode: (nodeId: TreeNode["id"]) => TreeNode["id"];
  updateNode: (
    nodeId: TreeNode["id"],
    node: Omit<TreeNode, "id">,
  ) => TreeNode["id"];
  setTree: React.Dispatch<React.SetStateAction<TreeNode[]>>;
  collapseAll: () => void;
  expandAll: () => void;
  selectedNode: TreeNode | undefined;
  setSelectedNode: React.Dispatch<React.SetStateAction<TreeNode | undefined>>;
}

export const TreeContext = createContext<TreeProvider | undefined>(undefined);

export function TreeProvider({
  children,
  initialTree = [],
}: React.PropsWithChildren<TreeProviderProps>) {
  const [tree, setTree] = useState<TreeNode[]>(initialTree);
  const [selectedNode, setSelectedNode] = useState<TreeNode | undefined>(
    undefined,
  );
  const appendNode = (node: CreateNode) => {
    const newNode = createNode(node);
    setTree([...tree, newNode]);
    return newNode;
  };

  const removeNode = (nodeId: TreeNode["id"]) => {
    setTree(tree.filter((n) => n.id !== nodeId));
    return nodeId;
  };

  const updateNode = (nodeId: TreeNode["id"], node: Omit<TreeNode, "id">) => {
    setTree(
      tree.map((n) => {
        if (n.id === nodeId) {
          return { ...n, ...node };
        }
        return n;
      }),
    );

    return nodeId;
  };

  const collapseAll = () => {
    setTree(
      tree.map((node) => {
        return { ...node, isExpanded: false };
      }),
    );
  };

  const expandAll = () => {
    setTree(
      tree.map((node) => {
        return { ...node, isExpanded: true };
      }),
    );
  };

  return (
    <TreeContext.Provider
      value={{
        tree,
        appendNode,
        removeNode,
        updateNode,
        setTree,
        collapseAll,
        expandAll,
        selectedNode,
        setSelectedNode,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
}

export function useTree() {
  const context = useContext(TreeContext);
  if (context === undefined) {
    throw new Error("useTree must be used within a TreeProvider");
  }
  return context;
}
