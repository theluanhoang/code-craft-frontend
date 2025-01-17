export const subjects = [
  {
    id: "G000",
    name: "Github",
    slug: "git",
    path: "/git",
    dept: 0,
    menu: [
      {
        id: "G001",
        name: "Commit",
        dept: 1,
        path: "/git/commit",
        slug: "commit",
        menu: [
          {
            id: "G0012",
            name: "Commit 123",
            dept: 2,
            path: "/git/commit-1",
            slug: "commit12",
            menu: [
              {
                id: "G0012-1",
                name: "Commit with message",
                dept: 3,
                path: "/git/commit-with-message",
                slug: "commit-with-message",
              },
              {
                id: "G0012-1",
                name: "Commit without message",
                dept: 3,
                path: "/git/commit-without-message",
                slug: "commit-without-message",
                
              },
            ],
          },
          {
            id: "G002",
            name: "Commit 456",
            dept: 2,
            path: "/git/commit-2",
            slug: "commit1244",
          },
        ],
      },
      {
        id: "G002",
        name: "Rebase",
        dept: 1,
        path: "/git/rebase",
        slug: "rebase",
      },
      {
        id: "G003",
        name: "Merge",
        dept: 1,
        path: "/git/merge",
        slug: "merge",
      },
      {
        id: "G004",
        name: "Push",
        dept: 1,
        path: "/git/push",
        slug: "push",
      },
    ],
  },
  {
    id: "H000",
    name: "HTML",
    dept: 0,
    path: "/html",
    slug: "html",
    menu: [
      {
        id: "H001",
        name: "Paragraphs",
        dept: 1,
        path: "/html/paragraphs",
        slug: "paragraphs",
      },
      {
        id: "H002",
        name: "Tables",
        dept: 1,
        path: "/html/tables",
        slug: "tables",
      },
      {
        id: "H003",
        name: "Responsive",
        dept: 1,
        path: "/html/responsive",
        slug: "responsive",
      },
      {
        id: "H004",
        name: "Semantics",
        dept: 1,
        path: "/html/semantics",
        slug: "semantics",
      },
    ],
  },
  {
    id: "C000",
    name: "CSS",
    dept: 0,
    path: "/css",
    slug: "css",
    menu: [
      {
        id: "C001",
        name: "Box Model",
        dept: 1,
        path: "/css/box-model",
        slug: "box-model",
      },
      {
        id: "C002",
        name: "Flex Box",
        dept: 1,
        path: "/css/flex-box",
        slug: "flex-box",
      },
      {
        id: "C003",
        name: "Overflows",
        dept: 1,
        path: "/css/overflows",
        slug: "overflows",
      },
      {
        id: "C004",
        name: "Opacity",
        dept: 1,
        path: "/css/opacity",
        slug: "opacity",
      },
    ],
  },
  {
    id: "J000",
    name: "Javascript",
    dept: 0,
    path: "/javascript",
    slug: "javascript",
    menu: [
      {
        id: "J001",
        name: "Statements",
        dept: 1,
        path: "/javascript/statements",
        slug: "statements",
      },
      {
        id: "J002",
        name: "Modules",
        dept: 1,
        path: "/javascript/modules",
        slug: "modules",
      },
      {
        id: "J003",
        name: "Classes",
        dept: 1,
        path: "/javascript/classes",
        slug: "classes",
      },
      {
        id: "J004",
        name: "If Else",
        dept: 1,
        path: "/javascript/if-else",
        slug: "if-else",
      },
    ],
  },
  {
    id: "D001",
    name: "Docker",
    dept: 0,
    path: "/docker",
    slug: "docker",
  },
]
