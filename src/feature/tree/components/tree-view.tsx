"use client";
import RepoList from "@/app/repo-list";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Node from "@/feature/tree/components/node";
import { TreeProvider, useTree } from "@/feature/tree/components/tree-provider";
import { AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { toast } from "sonner";
import { buildTree, printMarkdownTree, printTree } from "../../../lib/tree";
import { sortTree } from "../../../lib/tree/transform";
import { TreeNode } from "../../../lib/tree/tree.types";

function Tree() {
  const { tree, setTree, selectedNode, appendNode } = useTree();
  const rootNodes = tree.filter((node) => !node.parentId);

  const handleClickSortTreeButton = () => {
    setTree((prev) => {
      const newPrev = [...prev];
      return sortTree(newPrev);
    });
  };
  const nodeCount: {
    all: number;
    directories: number;
    files: number;
  } = useMemo(() => {
    const count = tree.reduce(
      (acc, node) => {
        if (node.type === "directory") {
          acc.directories += 1;
        } else {
          acc.files += 1;
        }
        return acc;
      },
      { directories: 0, files: 0 },
    );

    return {
      all: tree.length,
      ...count,
    };
  }, [tree]);

  const handleClickExportAsciiTree = () => {
    const asciiTree = printTree(buildTree(tree));
    navigator.clipboard.writeText(asciiTree);
    toast.success("Tree copied to clipboard");
  };

  const handleClickExportMarkdown = () => {
    const markdown = printMarkdownTree(buildTree(tree));
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied to clipboard");
  };

  const handleNewNode = (type: "directory" | "file") => {
    // selected node와 같은 위치에 새로운 노드를 추가
    // selected node가 없으면 root에 추가
    const newNode = appendNode({
      name: "new node",
      parentId: selectedNode?.id || null,
      type: type,
    });

    setTimeout(() => {
      const nodeElement = document.querySelector(
        `[data-node-id="${newNode.id}"]`,
      );

      if (nodeElement) {
        (nodeElement as HTMLLIElement).focus();
      }
    }, 0);
  };

  return (
    <div className="border border-gray-600 rounded-lg ">
      <div className="p-4 flex items-center justify-between">
        <p>
          <span className="font-semibold text-primary">{nodeCount.all}</span>
          &nbsp; 노드 (폴더&nbsp;{nodeCount.directories}, 파일&nbsp;
          {nodeCount.files})
        </p>
        <div className="flex gap-4">
          <Button onClick={() => handleNewNode("file")} variant="outline">
            New File
          </Button>
          <Button onClick={handleClickSortTreeButton} variant="outline">
            Sort Tree
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Export</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Export Tree</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <button
                    onClick={handleClickExportAsciiTree}
                    className="w-full"
                  >
                    ASCII Text
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={handleClickExportMarkdown}
                    className="w-full"
                  >
                    Markdown Text
                  </button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ul className="p-4">
        <AnimatePresence>
          {rootNodes.map((node) => (
            <Node key={node.id} node={node} depth={0} />
          ))}
        </AnimatePresence>
      </ul>

      <RepoList
        onFetchSuccess={(node) => {
          setTree(node);
        }}
      />
    </div>
  );
}

interface TreeViewProps {
  initialTree?: TreeNode[];
}

export default function TreeView({ initialTree }: TreeViewProps) {
  return (
    <TreeProvider initialTree={initialTree}>
      <Tree />
    </TreeProvider>
  );
}
