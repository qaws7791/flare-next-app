import { expect, test } from "vitest";
import { createNode, isRootNode } from ".";
import { TreeNode } from "./tree.types";

const isUUID = (id: string) => {
  return id.match(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
  );
};

test("create file node", () => {
  const node = createNode({
    name: "test",
    parentId: null,
    type: "file",
  });

  expect(node.id).toBeDefined();
  expect(isUUID(node.id)).toBeTruthy();
  expect({ ...node, id: "test" }).toEqual({
    id: "test",
    name: "test",
    parentId: null,
    type: "file",
  });
});

test("create directory node", () => {
  const node = createNode({
    name: "test",
    parentId: null,
    type: "directory",
  });

  expect(node.id).toBeDefined();
  expect(isUUID(node.id)).toBeTruthy();
  expect({ ...node, id: "test" }).toEqual({
    id: "test",
    name: "test",
    parentId: null,
    type: "directory",
  });
});

test("is root node", () => {
  const node = createNode({
    name: "test",
    parentId: null,
    type: "directory",
  });

  expect(isRootNode(node)).toBeTruthy();
});

test("append file to directory", () => {
  const tree: TreeNode[] = [];

  const directory = createNode({
    name: "directory",
    parentId: null,
    type: "directory",
  });

  const file = createNode({
    name: "file",
    parentId: directory.id,
    type: "file",
  });

  tree.push(directory, file);

  expect(tree).toEqual([
    {
      id: directory.id,
      name: "directory",
      parentId: null,
      type: "directory",
    },
    {
      id: file.id,
      name: "file",
      parentId: directory.id,
      type: "file",
    },
  ]);
});
