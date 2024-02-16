"use server";
import { writeFileSync } from "fs";

export async function dbWrite(data) {
  writeFileSync("./src/db/DB.json", JSON.stringify(data), {
    encoding: "utf-8",
    flag: "w",
  });
  return true;
}
