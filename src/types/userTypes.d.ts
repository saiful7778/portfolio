export type User = {
  name: string;
  email: string;
  isVerified: boolean;
  image?: {
    url: string;
    alt: string;
  } | null;
  access: boolean;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
};
