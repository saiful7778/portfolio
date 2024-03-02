"use server";
import { writeFile } from "fs/promises";
import path from "path";

export default async function writeData(inputData) {
  const dataFilePath = path.join(process.cwd(), "settings/data.json");
  try {
    await writeFile(dataFilePath, JSON.stringify(inputData, null, 2), {
      encoding: "utf-8",
      flag: "w",
    });
    return true;
  } catch (err) {
    throw new Error(err);
  }
}
