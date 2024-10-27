import type { hierarchyPathDataType } from "@/types";
import fs from "fs";
import path from "path";

function readDirData(pathName: string): hierarchyPathDataType[] {
  const pathDir = fs.readdirSync(pathName);

  const pathData: hierarchyPathDataType[] = [];

  for (const x of pathDir) {
    let comment: string = "";
    const fullPath = path.join(pathName, x);
    const isDirectory = fs.statSync(fullPath).isDirectory();

    if (isDirectory) {
      if (x.indexOf("(") !== -1) {
        comment = "it is route group";
      }

      if (fullPath.indexOf("api") !== -1) {
        if (fullPath.length > 43) {
          comment = "it is api route folder";
        } else {
          comment = "it is api folder";
        }
      }

      pathData.push({
        name: x,
        type: "folder",
        children: readDirData(fullPath),
        comment: comment || "it is a folder",
      });
    } else {
      if (x.indexOf(".css") > 0) comment = "it is a CSS file";
      if (x.indexOf("layout") !== -1) {
        comment = "it is page layout file";
      }
      if (x.indexOf("error") !== -1) {
        comment = "it is page error boundary";
      }
      if (x.indexOf("loading") !== -1) {
        comment = "it is page loading suspense boundary";
      }
      if (x.indexOf("not-found") !== -1) {
        comment = "it is not found page error boundary";
      }

      let link: string = "";

      if (x.indexOf("page") !== -1) {
        const route = fullPath
          .slice(fullPath.indexOf("app") + 4, fullPath.length - 9)
          .replace(/\(.*?\//gi, "");

        link = route.indexOf("(") !== -1 ? "/" : `/${route}`;

        comment = `It is a page, route is ${process.env.NEXT_PUBLIC_DOMAIN}${link}`;
      }
      if (x.indexOf("favicon") !== -1) {
        comment = "it is favicon";
      }
      if (x.indexOf("route") !== -1) {
        comment = "it is a route";
      }

      pathData.push({
        name: x,
        type: "file",
        comment: comment,
        link: link ?? undefined,
      });
    }
  }

  return pathData;
}

export default function createAppDirHierarchy(): hierarchyPathDataType[] {
  const appPath = path.join(process.cwd(), "/src/app");
  return readDirData(appPath);
}
