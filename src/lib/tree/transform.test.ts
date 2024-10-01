import { expect, test } from "vitest";
import { convertGithubNodeToTreeNode } from "./transform";

const GITHUB_NODES = [
  {
    path: "a",
    mode: "040000",
    type: "tree",
    sha: "a1a45ccbeabb7b8e33b8fa2870a92e48f8401c08",
    url: "https://api.github.com/repos/qaws7791/tree-test/git/trees/a1a45ccbeabb7b8e33b8fa2870a92e48f8401c08",
  },
  {
    path: "a/b",
    mode: "040000",
    type: "tree",
    sha: "47d83249b05cf06491633be38ea8637c5b356acc",
    url: "https://api.github.com/repos/qaws7791/tree-test/git/trees/47d83249b05cf06491633be38ea8637c5b356acc",
  },
  {
    path: "a/b/file",
    mode: "100644",
    type: "blob",
    sha: "8b137891791fe96927ad78e64b0aad7bded08bdc",
    size: 1,
    url: "https://api.github.com/repos/qaws7791/tree-test/git/blobs/8b137891791fe96927ad78e64b0aad7bded08bdc",
  },
  {
    path: "c",
    mode: "040000",
    type: "tree",
    sha: "b8c32934ccd4ced1406d4ee36233bb2d32fefd5c",
    url: "https://api.github.com/repos/qaws7791/tree-test/git/trees/b8c32934ccd4ced1406d4ee36233bb2d32fefd5c",
  },
  {
    path: "c/d",
    mode: "040000",
    type: "tree",
    sha: "c90587f5ac97e1544f6616560bb95ac49ac5fe16",
    url: "https://api.github.com/repos/qaws7791/tree-test/git/trees/c90587f5ac97e1544f6616560bb95ac49ac5fe16",
  },
  {
    path: "c/d/e",
    mode: "040000",
    type: "tree",
    sha: "47d83249b05cf06491633be38ea8637c5b356acc",
    url: "https://api.github.com/repos/qaws7791/tree-test/git/trees/47d83249b05cf06491633be38ea8637c5b356acc",
  },
  {
    path: "c/d/e/file",
    mode: "100644",
    type: "blob",
    sha: "8b137891791fe96927ad78e64b0aad7bded08bdc",
    size: 1,
    url: "https://api.github.com/repos/qaws7791/tree-test/git/blobs/8b137891791fe96927ad78e64b0aad7bded08bdc",
  },
  {
    path: "c/d/file",
    mode: "100644",
    type: "blob",
    sha: "8b137891791fe96927ad78e64b0aad7bded08bdc",
    size: 1,
    url: "https://api.github.com/repos/qaws7791/tree-test/git/blobs/8b137891791fe96927ad78e64b0aad7bded08bdc",
  },
  {
    path: "readme.md",
    mode: "100644",
    type: "blob",
    sha: "8178c76d627cade75005b40711b92f4177bc6cfc",
    size: 7,
    url: "https://api.github.com/repos/qaws7791/tree-test/git/blobs/8178c76d627cade75005b40711b92f4177bc6cfc",
  },
];

test("convert githubNodes to treeNodes", () => {
  const result = convertGithubNodeToTreeNode(GITHUB_NODES);

  expect(result.length).toBe(GITHUB_NODES.length);
});
