"use server";
import { readFileSync } from "fs";

export default async function dbReadServer() {
  const data = readFileSync("./src/db/DB.json", {
    encoding: "utf-8",
    flag: "r",
  });
  return JSON.parse(data);
}
