"use client";
import { File, FolderClosed } from "lucide-react";
import { MdOutlineArrowRight, MdOutlineArrowDropDown } from "react-icons/md";
import { FC, useState } from "react";
import SectionElement from "@/components/SectionElement";
import Link from "next/link";
import { hierarchyData, type pathDataType } from "@/lib/staticData";

const Hierarchy: FC = () => {
  return (
    <SectionElement title="Folder structure" text="Structure of this app" blob>
      <div className="mx-auto max-h-96 min-h-fit w-full max-w-3xl overflow-auto rounded-md bg-card p-4">
        {hierarchyData ? (
          <ul>
            {hierarchyData.map((node, idx) => (
              <HierarchyNode key={`hierarchy-node-${idx}`} node={node} />
            ))}
          </ul>
        ) : (
          <div className="text-center text-2xl font-bold text-destructive">
            Something went wrong
          </div>
        )}
      </div>
    </SectionElement>
  );
};

const HierarchyNode = ({ node }: { node: pathDataType }) => {
  const [showChild, setShowChild] = useState<boolean>(false);

  return (
    <li>
      <div className="flex w-fit select-none items-center">
        {node.type === "folder" ? (
          <>
            <span>
              {showChild ? (
                <MdOutlineArrowDropDown size={20} />
              ) : (
                <MdOutlineArrowRight size={20} />
              )}
            </span>
            <span className="mr-2">
              <FolderClosed size={15} />
            </span>
          </>
        ) : node.type === "file" ? (
          <span className="mx-2">
            <File size={15} />
          </span>
        ) : null}
        {node.link ? (
          <Link
            href={node.link}
            target="_blank"
            className="hover:underline"
            title="Click to go the page"
          >
            {node.name}
          </Link>
        ) : (
          <span
            onClick={() => {
              if (node.children && node.children.length > 0) {
                setShowChild((prop) => !prop);
              }
            }}
            className="cursor-pointer hover:underline"
          >
            {node.name}
          </span>
        )}
        {node?.comment && (
          <span className="ml-4 text-slate-700 max-sm:hidden">
            {"// " + node.comment}
          </span>
        )}
      </div>
      {showChild && (
        <ul className="ml-2">
          {node.children && node.children.length > 0 && (
            <ul className="ml-2">
              {node.children.map((child, idx) => (
                <HierarchyNode key={`hierarchy-child-${idx}`} node={child} />
              ))}
            </ul>
          )}
        </ul>
      )}
    </li>
  );
};

export default Hierarchy;
