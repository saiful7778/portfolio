import { readFileSync } from "fs";

export default function dbRead() {
  const data = readFileSync("./src/db/DB.json", {
    encoding: "utf-8",
    flag: "r",
  });
  return JSON.parse(data);
}
