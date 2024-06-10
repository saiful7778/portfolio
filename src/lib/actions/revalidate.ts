"use server";
import { revalidatePath } from "next/cache";

export default async function revalidate(
  originalPath: string,
  type: "layout" | "page" = "page",
) {
  revalidatePath(originalPath, type);
}
