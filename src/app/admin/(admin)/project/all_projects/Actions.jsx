"use client";
// components
import { Popover } from "keep-react";
import Button from "@/components/utilities/Button";
// icons
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

const Actions = ({ projectId }) => {
  console.log(projectId);
  return (
    <>
      <Popover
        showDismissIcon={false}
        showArrow={false}
        position="left"
        className="border border-gray-700 !bg-gray-800 !px-2 !py-2 "
      >
        <Popover.Action>
          <Button size="sm" variant="primary-outline" shape="icon-button">
            <BsThreeDotsVertical size={15} />
          </Button>
        </Popover.Action>
        <Popover.Container className="!mt-0 !block">
          <ul>
            <li>
              <button className="flex w-full items-center justify-between gap-4 rounded px-2 py-1 hover:bg-gray-700">
                <span>Delete</span>
                <span>
                  <FaTrashCan />
                </span>
              </button>
            </li>
            <li>
              <button className="flex w-full items-center justify-between gap-4 rounded px-2 py-1 hover:bg-gray-700">
                <span>Edit</span>
                <span>
                  <CiEdit strokeWidth={1} />
                </span>
              </button>
            </li>
          </ul>
        </Popover.Container>
      </Popover>
    </>
  );
};

export default Actions;
