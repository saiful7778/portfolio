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
