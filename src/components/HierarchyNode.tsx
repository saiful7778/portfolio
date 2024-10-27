"use client";
import type { hierarchyPathDataType } from "@/types";
import { File, FolderClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineArrowDropDown, MdOutlineArrowRight } from "react-icons/md";

const HierarchyNode: React.FC<{ node: hierarchyPathDataType }> = ({ node }) => {
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
            role="button"
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

export default HierarchyNode;
