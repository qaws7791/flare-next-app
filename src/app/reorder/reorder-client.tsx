"use client";
import { TreeNode } from "@/lib/tree/tree.types";
import { Reorder } from "framer-motion";
import { useState } from "react";

const dummyData: TreeNode[] = [
  {
    id: "f3014a69-9c45-4c5b-8788-cc9886c58e32",
    name: ".vscode",
    parentId: null,
    type: "directory",
  },
  {
    id: "28784a66-affb-4b0a-bf7a-8d5032cf7c99",
    name: "blog",
    parentId: "26ff3e9b-4074-453b-b2b9-1ec19a7f64a3",
    type: "directory",
  },
  {
    id: "d70a41a9-791f-4dfe-be54-0b91cfb4536d",
    name: "blog",
    parentId: "39b8db06-abb2-4795-87ed-b40442fcdd1e",
    type: "directory",
  },
  {
    id: "b6db73a5-043e-4453-9ce1-532d916c84b4",
    name: "components",
    parentId: "a70e55fa-3320-4269-86db-eb1dc7753595",
    type: "directory",
  },
  {
    id: "26ff3e9b-4074-453b-b2b9-1ec19a7f64a3",
    name: "content",
    parentId: "a70e55fa-3320-4269-86db-eb1dc7753595",
    type: "directory",
  },
  {
    id: "712d5e20-12ad-4a31-96c3-5425a1ef0df5",
    name: "fonts",
    parentId: "b618c283-f1a9-4c33-8745-c3d34e53a0ab",
    type: "directory",
  },
  {
    id: "6485da91-9757-42f2-a47a-f20aadbffadd",
    name: "layouts",
    parentId: "a70e55fa-3320-4269-86db-eb1dc7753595",
    type: "directory",
  },
  {
    id: "94b94deb-5e29-490e-90cb-5bbc908ca491",
    name: "motion",
    parentId: "b6db73a5-043e-4453-9ce1-532d916c84b4",
    type: "directory",
  },
  {
    id: "39b8db06-abb2-4795-87ed-b40442fcdd1e",
    name: "pages",
    parentId: "a70e55fa-3320-4269-86db-eb1dc7753595",
    type: "directory",
  },
  {
    id: "b618c283-f1a9-4c33-8745-c3d34e53a0ab",
    name: "public",
    parentId: null,
    type: "directory",
  },
  {
    id: "a70e55fa-3320-4269-86db-eb1dc7753595",
    name: "src",
    parentId: null,
    type: "directory",
  },
  {
    id: "5468e667-3619-4ab6-ad9e-89e4de374d19",
    name: "styles",
    parentId: "a70e55fa-3320-4269-86db-eb1dc7753595",
    type: "directory",
  },
  {
    id: "4f1634b0-65e7-4cee-a16a-209bfac7654b",
    name: ".gitignore",
    parentId: null,
    type: "file",
  },
  {
    id: "986baf64-e273-4c50-a5f8-7d1f53d07dfe",
    name: "[...slug].astro",
    parentId: "d70a41a9-791f-4dfe-be54-0b91cfb4536d",
    type: "file",
  },
  {
    id: "0a3c5255-058a-435a-bfa4-96d8698d90bc",
    name: "astro.config.mjs",
    parentId: null,
    type: "file",
  },
  {
    id: "bb9d1114-e8fb-4150-93b7-ec617c4ace2e",
    name: "BaseHead.astro",
    parentId: "b6db73a5-043e-4453-9ce1-532d916c84b4",
    type: "file",
  },
  {
    id: "7f5bfc03-8083-4d8b-8e41-bc352fd8916e",
    name: "blog-placeholder-1.jpg",
    parentId: "b618c283-f1a9-4c33-8745-c3d34e53a0ab",
    type: "file",
  },
  {
    id: "02f53b25-f0ba-4678-8db6-d449b6d83c8a",
    name: "blog-placeholder-2.jpg",
    parentId: "b618c283-f1a9-4c33-8745-c3d34e53a0ab",
    type: "file",
  },
  {
    id: "c1d78113-561e-499f-b3c0-1f0da209b87f",
    name: "blog-placeholder-3.jpg",
    parentId: "b618c283-f1a9-4c33-8745-c3d34e53a0ab",
    type: "file",
  },
  {
    id: "3259c96c-2acb-47f2-825c-adaacda6cf87",
    name: "blog-placeholder-4.jpg",
    parentId: "b618c283-f1a9-4c33-8745-c3d34e53a0ab",
    type: "file",
  },
  {
    id: "566bd535-330d-44d1-99b5-2003a448b7a9",
    name: "Circle.tsx",
    parentId: "94b94deb-5e29-490e-90cb-5bbc908ca491",
    type: "file",
  },
  {
    id: "3e1b2039-ba85-499d-87a8-c594afdce12e",
    name: "ComponentPreview.tsx",
    parentId: "94b94deb-5e29-490e-90cb-5bbc908ca491",
    type: "file",
  },
  {
    id: "134268cb-395a-4526-8393-622e82f04f3b",
    name: "config.ts",
    parentId: "26ff3e9b-4074-453b-b2b9-1ec19a7f64a3",
    type: "file",
  },
  {
    id: "8d856ea1-5329-451a-85de-7755dabfc36a",
    name: "consts.ts",
    parentId: "a70e55fa-3320-4269-86db-eb1dc7753595",
    type: "file",
  },
  {
    id: "b5fd4b35-c1cc-49bc-89c2-4a64dfcb06d5",
    name: "DraggableList.tsx",
    parentId: "94b94deb-5e29-490e-90cb-5bbc908ca491",
    type: "file",
  },
  {
    id: "7ed45626-11e1-45fe-adb7-5b3abe29e999",
    name: "env.d.ts",
    parentId: "a70e55fa-3320-4269-86db-eb1dc7753595",
    type: "file",
  },
  {
    id: "7ba71760-a4ab-46a7-815d-85b969e83f4b",
    name: "extensions.json",
    parentId: "f3014a69-9c45-4c5b-8788-cc9886c58e32",
    type: "file",
  },
  {
    id: "f2af989a-c69d-4159-a53c-a3e8184f1662",
    name: "favicon.ico",
    parentId: "b618c283-f1a9-4c33-8745-c3d34e53a0ab",
    type: "file",
  },
  {
    id: "6e3e866e-07c5-47fd-b1ce-e61ac888793f",
    name: "first-motion copy.mdx",
    parentId: "28784a66-affb-4b0a-bf7a-8d5032cf7c99",
    type: "file",
  },
  {
    id: "cde72419-6427-4722-b643-a7afed5a6f1d",
    name: "first-motion.mdx",
    parentId: "28784a66-affb-4b0a-bf7a-8d5032cf7c99",
    type: "file",
  },
  {
    id: "78ae40a2-da9c-48c4-9394-e911eeb3330b",
    name: "font-test.astro",
    parentId: "39b8db06-abb2-4795-87ed-b40442fcdd1e",
    type: "file",
  },
  {
    id: "e1b03c68-be03-4694-b37a-85545238ba34",
    name: "Footer.astro",
    parentId: "b6db73a5-043e-4453-9ce1-532d916c84b4",
    type: "file",
  },
  {
    id: "8aacd8a8-8f99-49a9-b33c-57ca9dae84c0",
    name: "FormattedDate.astro",
    parentId: "b6db73a5-043e-4453-9ce1-532d916c84b4",
    type: "file",
  },
  {
    id: "7db9220e-3973-453a-9a3d-4dfdbc074e7e",
    name: "GithubIcon.tsx",
    parentId: "b6db73a5-043e-4453-9ce1-532d916c84b4",
    type: "file",
  },
  {
    id: "3d6c230e-4b58-4bb3-8522-98709724a7c9",
    name: "global.css",
    parentId: "5468e667-3619-4ab6-ad9e-89e4de374d19",
    type: "file",
  },
  {
    id: "21a17d35-4367-4133-95ef-a7fec5f92f35",
    name: "Header.astro",
    parentId: "b6db73a5-043e-4453-9ce1-532d916c84b4",
    type: "file",
  },
  {
    id: "d1c157e7-9d74-438a-8b4c-5917ad5ba24e",
    name: "HeaderLink.astro",
    parentId: "b6db73a5-043e-4453-9ce1-532d916c84b4",
    type: "file",
  },
  {
    id: "e278677c-1fb8-4011-b03e-55924f323be4",
    name: "index.astro",
    parentId: "39b8db06-abb2-4795-87ed-b40442fcdd1e",
    type: "file",
  },
  {
    id: "0bbede7a-bb4a-4073-954c-a3627787ff58",
    name: "launch.json",
    parentId: "f3014a69-9c45-4c5b-8788-cc9886c58e32",
    type: "file",
  },
  {
    id: "30c48c4e-b605-45cc-83e1-3c61d24ea801",
    name: "Layout.astro",
    parentId: "6485da91-9757-42f2-a47a-f20aadbffadd",
    type: "file",
  },
  {
    id: "4e7119d1-7c62-4671-8d0f-b4e1e2b576a1",
    name: "LayoutAnimationExample.tsx",
    parentId: "94b94deb-5e29-490e-90cb-5bbc908ca491",
    type: "file",
  },
  {
    id: "688f6c19-f2d3-48ff-ae71-da73009fcb2f",
    name: "MotionValueExample.tsx",
    parentId: "94b94deb-5e29-490e-90cb-5bbc908ca491",
    type: "file",
  },
  {
    id: "1c4de04e-22d4-4952-b67e-efe585e90c97",
    name: "MotionValues.tsx",
    parentId: "94b94deb-5e29-490e-90cb-5bbc908ca491",
    type: "file",
  },
  {
    id: "98384867-da83-4dab-ba6c-e2471ca690a3",
    name: "NanumSquareNeo-Variable.woff2",
    parentId: "712d5e20-12ad-4a31-96c3-5425a1ef0df5",
    type: "file",
  },
  {
    id: "93049200-a582-4e27-a58c-5578c07dbff7",
    name: "package.json",
    parentId: null,
    type: "file",
  },
  {
    id: "d4bf68a9-6034-4370-835b-1815c3cfd34f",
    name: "pnpm-lock.yaml",
    parentId: null,
    type: "file",
  },
  {
    id: "93cb9766-4506-4933-9322-c5143fe6127a",
    name: "README.md",
    parentId: null,
    type: "file",
  },
  {
    id: "8d82bb83-adc6-4251-a16a-bd238eeb6341",
    name: "registry.tsx",
    parentId: "b6db73a5-043e-4453-9ce1-532d916c84b4",
    type: "file",
  },
  {
    id: "fd34c2a1-f453-4628-9589-6789a3ec5b90",
    name: "rss.xml.js",
    parentId: "39b8db06-abb2-4795-87ed-b40442fcdd1e",
    type: "file",
  },
  {
    id: "1a0d17d5-d4a3-4ee3-a021-db4d3bf7ff0a",
    name: "ScrollTriggeredAnimation.tsx",
    parentId: "94b94deb-5e29-490e-90cb-5bbc908ca491",
    type: "file",
  },
  {
    id: "99660986-c11c-42b5-b234-fd2b43ef91ea",
    name: "TableOfContents.astro",
    parentId: "b6db73a5-043e-4453-9ce1-532d916c84b4",
    type: "file",
  },
  {
    id: "577de0e6-ce61-4b3a-aca3-08fd4bba0dd6",
    name: "TableOfContentsHeading.astro",
    parentId: "b6db73a5-043e-4453-9ce1-532d916c84b4",
    type: "file",
  },
  {
    id: "40213701-7f66-47db-889c-0a7319655ed1",
    name: "Tabs.tsx",
    parentId: "94b94deb-5e29-490e-90cb-5bbc908ca491",
    type: "file",
  },
  {
    id: "b9565863-c539-4032-90cb-610cc84788ff",
    name: "tailwind.config.mjs",
    parentId: null,
    type: "file",
  },
  {
    id: "ab66d8dc-cd2f-4c11-85f3-86419b33a367",
    name: "tsconfig.json",
    parentId: null,
    type: "file",
  },
  {
    id: "a497ebdc-362f-4ff0-b740-dd5bdc4e8e4c",
    name: "VariantsExample.tsx",
    parentId: "94b94deb-5e29-490e-90cb-5bbc908ca491",
    type: "file",
  },
  {
    id: "f4ed9770-e851-4e54-8a92-02160e94a14d",
    name: "WhileExample.tsx",
    parentId: "94b94deb-5e29-490e-90cb-5bbc908ca491",
    type: "file",
  },
];

function buildFlatTree(nodes, parentId = null, path = "", depth = 0) {
  let result = [];
  nodes
    .filter((node) => node.parentId === parentId)
    .forEach((node) => {
      const newPath = path ? `${path}/${node.name}` : node.name;
      result.push({ ...node, path: newPath, depth });
      result = result.concat(buildFlatTree(nodes, node.id, newPath, depth + 1));
    });
  return result;
}

const allNodes = buildFlatTree(dummyData);

export default function ReorderClient() {
  const [items, setItems] = useState(allNodes);

  const collapse = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (!item) return;
    const children = items.filter((item) => item.path.startsWith(item.path));
    const newItems = items.filter((item) => !item.path.startsWith(item.path));
    setItems(newItems);
  };

  const expand = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (!item) return;
    const children = allNodes.filter((item) => item.path.startsWith(item.path));
    const newItems = [...items, ...children];
    setItems(newItems);
  };

  return (
    <Reorder.Group
      axis="y"
      values={items.map((item) => item.id)}
      onReorder={(newOrder) => {
        console.log(newOrder);
        setItems(newOrder.map((id) => items.find((item) => item.id === id)!));
      }}
    >
      {items.map((item) => (
        <Reorder.Item
          key={item.id}
          value={item.id}
          className="bg-gray-100 p-4 mb-2 text-black flex"
        >
          {Array.from({ length: item.depth }).map((_, i) => (
            <span key={i} className="w-4" />
          ))}
          <span
            onClick={() => {
              collapse(item.id);
            }}
            className="cursor-pointer"
          >
            {item.type === "directory" ? "📁" : "📄"}
          </span>
          <span>{item.path}</span>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
