"use client";
import ArrowDropDownIcon from "@/components/icons/arrow-dropdown-icon";
import FileIcon from "@/components/icons/file-icon";
import FolderFilledIcon from "@/components/icons/folder-filled-icon";
import FolderOpenFilledIcon from "@/components/icons/folder-open-filled-icon";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import NodeIndent from "@/feature/tree/components/node-indent";
import { useTree } from "@/feature/tree/components/tree-provider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { Fragment, useMemo, useRef, useState } from "react";
import { TreeNode } from "../../../lib/tree/tree.types";

interface NodeProps {
  node: TreeNode;
  depth?: number;
}

export default function Node({ node, depth = 1, ...props }: NodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [renameInput, setRenameInput] = useState(node.name);
  const {
    tree,
    appendNode,
    updateNode,
    removeNode,
    setSelectedNode,
    selectedNode,
  } = useTree();

  const appendChildNode = (type: "directory" | "file") => {
    const newNode = appendNode({
      name: "",
      parentId: node.id,
      type: type,
    });
    setIsExpanded(true);
    // focus on the new node input
    setTimeout(() => {
      const nodeElement = document.querySelector(
        `[data-node-id="${newNode.id}"] input`,
      );

      if (nodeElement) {
        (nodeElement as HTMLInputElement).focus();
      }
    }, 0);
  };

  const children = useMemo(() => {
    return tree.filter((child) => child.parentId === node.id);
  }, [tree, node.id]);

  const childrenCount = useMemo(() => {
    return children.length;
  }, [children]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        handleCompleteEditing();
        break;
      case "Escape":
        setIsEditing(false);
        setRenameInput(node.name);
        break;
    }
  };

  const handleCompleteEditing = () => {
    const newName = renameInput.trim();
    setIsEditing(false);
    if (node.name === renameInput) return;
    setRenameInput(newName);
    updateNode(node.id, { ...node, name: renameInput });
  };

  return (
    <Fragment>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            key={node.id}
            className={cn(
              "overflow-hidden hover:bg-accent/50 rounded-md",
              selectedNode?.id === node.id && "bg-accent",
            )}
            data-node-id={node.id}
            onClick={() => {
              setSelectedNode(node);
              console.log("selectedNode", selectedNode);
            }}
          >
            <li
              className="flex items-center gap-0.5 overflow-hidden rounded-md p-1 transition-all"
              key={node.id}
              {...props}
            >
              <NodeIndent depth={depth} />
              {node.type === "directory" ? (
                <>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="h-6 w-6 inline-flex items-center justify-center bg-transparent text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-all"
                  >
                    <ArrowDropDownIcon
                      className={
                        isExpanded
                          ? "rotate-0 transition-transform w-5 h-5"
                          : "-rotate-90 transition-transform w-5 h-5"
                      }
                    />
                  </button>
                </>
              ) : (
                <NodeIndent depth={1} />
              )}
              <span>
                {node.type === "file" ? (
                  <FileIcon />
                ) : isExpanded ? (
                  <FolderOpenFilledIcon className="text-blue-500" />
                ) : (
                  <FolderFilledIcon className="text-blue-500" />
                )}
              </span>

              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={renameInput}
                  className="bg-transparent outline-none w-44 focus:ring-2 focus:ring-primary-500 rounded-md"
                  onChange={(e) => setRenameInput(e.target.value)}
                  placeholder="Node name"
                  onKeyDown={handleKeyDown}
                  onBlur={handleCompleteEditing}
                />
              ) : (
                <span className="truncate">{node.name}</span>
              )}
            </li>
          </motion.div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {node.type === "directory" && (
            <>
              <ContextMenuItem onSelect={() => appendChildNode("file")}>
                New file
              </ContextMenuItem>
              <ContextMenuItem onSelect={() => appendChildNode("directory")}>
                New Directory
              </ContextMenuItem>
            </>
          )}
          <ContextMenuItem
            onSelect={() => {
              setIsEditing(true);
              setSelectedNode(node);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}
          >
            Rename
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => removeNode(node.id)}>
            Remove
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {isExpanded &&
        children.map((child) => (
          <Node key={child.id} node={child} depth={depth + 1} />
        ))}
    </Fragment>
  );
}
