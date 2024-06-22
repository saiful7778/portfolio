type navLinkTypes = {
  navName: string;
  path: string;
  subPath?: string | undefined;
};

export const navLinks: navLinkTypes[] = [
  { navName: "home", path: "/" },
  {
    navName: "my projects",
    path: "/projects",
    subPath: "project",
  },
  { navName: "blog", path: "/blogs", subPath: "blog" },
];

export const autoTypingText: (string | number)[] = [
  "HTML5",
  2000,
  "CSS3",
  2000,
  "JS(ES6+)",
  2000,
  "Next.js",
  2000,
  "React.js",
  3000,
  "Next.js",
  2000,
  "Firebase",
  2000,
  "Node.js",
  2000,
  "Express.js",
  2000,
  "MongoDB",
  2000,
];

export type pathDataType = {
  name: string;
  type: "folder" | "file";
  children?: pathDataType[];
  comment?: string;
  link?: string;
};

export const hierarchyData: pathDataType[] = [
  {
    name: "(backend)",
    type: "folder",
    children: [
      {
        name: "(dashboard)",
        type: "folder",
        children: [
          {
            name: "(admin)",
            type: "folder",
            children: [
              {
                name: "layout.tsx",
                type: "file",
                comment: "it is page layout file",
              },
              {
                name: "settings",
                type: "folder",
                children: [
                  {
                    name: "page.tsx",
                    type: "file",
                    comment:
                      "It is a page, route is http://localhost:3000/settings",
                    link: "/settings",
                  },
                ],
                comment: "it is a folder",
              },
            ],
            comment: "it is route group",
          },
          {
            name: "dashboard",
            type: "folder",
            children: [
              {
                name: "page.tsx",
                type: "file",
                comment:
                  "It is a page, route is http://localhost:3000/dashboard",
                link: "/dashboard",
              },
              {
                name: "user-table",
                type: "folder",
                children: [
                  {
                    name: "UpdateUser.tsx",
                    type: "file",
                    comment: "",
                  },
                  {
                    name: "UserTable.tsx",
                    type: "file",
                    comment: "",
                  },
                  {
                    name: "columns.tsx",
                    type: "file",
                    comment: "",
                  },
                  {
                    name: "date-table.tsx",
                    type: "file",
                    comment: "",
                  },
                ],
                comment: "it is a folder",
              },
            ],
            comment: "it is a folder",
          },
          {
            name: "error.tsx",
            type: "file",
            comment: "it is page error boundary",
          },
          {
            name: "layout.tsx",
            type: "file",
            comment: "it is page layout file",
          },
          {
            name: "loading.tsx",
            type: "file",
            comment: "it is page loading suspense boundary",
          },
        ],
        comment: "it is route group",
      },
      {
        name: "error.tsx",
        type: "file",
        comment: "it is page error boundary",
      },
      {
        name: "layout.tsx",
        type: "file",
        comment: "it is page layout file",
      },
    ],
    comment: "it is route group",
  },
  {
    name: "(frontend)",
    type: "folder",
    children: [
      {
        name: "(auth)",
        type: "folder",
        children: [
          {
            name: "layout.tsx",
            type: "file",
            comment: "it is page layout file",
          },
          {
            name: "login",
            type: "folder",
            children: [
              {
                name: "LoginForm.tsx",
                type: "file",
                comment: "",
              },
              {
                name: "page.tsx",
                type: "file",
                comment: "It is a page, route is http://localhost:3000/login",
                link: "/login",
              },
            ],
            comment: "it is a folder",
          },
          {
            name: "register",
            type: "folder",
            children: [
              {
                name: "page.tsx",
                type: "file",
                comment:
                  "It is a page, route is http://localhost:3000/register",
                link: "/register",
              },
            ],
            comment: "it is a folder",
          },
          {
            name: "verify",
            type: "folder",
            children: [
              {
                name: "email",
                type: "folder",
                children: [
                  {
                    name: "VerifyButton.tsx",
                    type: "file",
                    comment: "",
                  },
                  {
                    name: "page.tsx",
                    type: "file",
                    comment:
                      "It is a page, route is http://localhost:3000/verify/email",
                    link: "/verify/email",
                  },
                ],
                comment: "it is a folder",
              },
            ],
            comment: "it is a folder",
          },
        ],
        comment: "it is route group",
      },
      {
        name: "layout.tsx",
        type: "file",
        comment: "it is page layout file",
      },
      {
        name: "page.tsx",
        type: "file",
        comment: "It is a page, route is http://localhost:3000/",
        link: "/",
      },
    ],
    comment: "it is route group",
  },
  {
    name: "api",
    type: "folder",
    children: [
      {
        name: "auth",
        type: "folder",
        children: [
          {
            name: "[...nextauth]",
            type: "folder",
            children: [
              {
                name: "route.ts",
                type: "file",
                comment: "it is a route",
              },
            ],
            comment: "it is api route folder",
          },
        ],
        comment: "it is api route folder",
      },
      {
        name: "captcha",
        type: "folder",
        children: [
          {
            name: "verify",
            type: "folder",
            children: [
              {
                name: "route.ts",
                type: "file",
                comment: "it is a route",
              },
            ],
            comment: "it is api route folder",
          },
        ],
        comment: "it is api route folder",
      },
      {
        name: "edgestore",
        type: "folder",
        children: [
          {
            name: "[...edgestore]",
            type: "folder",
            children: [
              {
                name: "route.ts",
                type: "file",
                comment: "it is a route",
              },
            ],
            comment: "it is api route folder",
          },
        ],
        comment: "it is api route folder",
      },
    ],
    comment: "it is api folder",
  },
  {
    name: "error.tsx",
    type: "file",
    comment: "it is page error boundary",
  },
  {
    name: "favicon.ico",
    type: "file",
    comment: "it is favicon",
  },
  {
    name: "globals.css",
    type: "file",
    comment: "it is a CSS file",
  },
  {
    name: "layout.tsx",
    type: "file",
    comment: "it is page layout file",
  },
  {
    name: "loading.tsx",
    type: "file",
    comment: "it is page loading suspense boundary",
  },
  {
    name: "not-found.tsx",
    type: "file",
    comment: "it is not found page error boundary",
  },
];
