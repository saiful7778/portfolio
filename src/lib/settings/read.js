import { readFile } from "fs/promises";
import path from "path";

export default async function readData() {
  const dataFilePath = path.join(process.cwd(), "settings/data.json");
  try {
    const data = await readFile(dataFilePath, {
      encoding: "utf-8",
      flag: "r",
    });
    return JSON.parse(data);
  } catch (err) {
    throw new Error(err);
  }
}
