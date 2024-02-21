"use client";
import { Popover } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { buttonStyle } from "./utilities/Button";
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { focus } from "@/theme";
import cn from "@/lib/cn";

const PopOver = ({ handleDelete, handleUpdate }) => {
  return (
    <Popover className="relative w-fit">
      <Popover.Button
        className={cn(
          buttonStyle.base,
          buttonStyle.outline,
          buttonStyle.size.sm,
          buttonStyle.shape["icon-button"],
          focus.base,
        )}
      >
        <BsThreeDotsVertical size={15} />
      </Popover.Button>
      <Popover.Panel className="absolute bottom-0 right-full mr-1 overflow-hidden rounded border border-gray-700 bg-gray-800">
        <button
          onClick={handleDelete}
          className="flex w-full items-center justify-between gap-4 px-2 py-1.5 hover:bg-gray-700"
        >
          <span>Delete</span>
          <span>
            <FaTrashCan />
          </span>
        </button>
        <button
          onClick={handleUpdate}
          className="flex w-full items-center justify-between gap-4 px-2 py-1.5 hover:bg-gray-700"
        >
          <span>Edit</span>
          <span>
            <CiEdit strokeWidth={1} />
          </span>
        </button>
      </Popover.Panel>
    </Popover>
  );
};

export default PopOver;
