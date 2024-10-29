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
  { navName: "blogs", path: "/blogs", subPath: "blog" },
];

export const typingAnimationData = [
  {
    id: "txt-1",
    text: "HTML5",
  },
  {
    id: "txt-2",
    text: "CSS3",
  },
  {
    id: "txt-3",
    text: "JavaScript",
  },
  {
    id: "txt-4",
    text: "Nextjs",
  },
  {
    id: "txt-5",
    text: "React",
  },
  {
    id: "txt-6",
    text: "Firebase",
  },
  {
    id: "txt-7",
    text: "Node",
  },
  {
    id: "txt-8",
    text: "Express",
  },
  {
    id: "txt-9",
    text: "MongoDB",
  },
];

export const DEFAULT_LOGIN_REDIRECT: string = "/admin";
