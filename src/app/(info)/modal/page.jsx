"use client";
import Modal from "@/components/Modal";
import Button from "@/components/utilities/Button";
import { Popover } from "@headlessui/react";
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

const ModalPage = () => {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <Button variant="confirm" onClick={() => setModal((l) => !l)}>
        Open modal
      </Button>
      <Modal
        open={modal}
        title="Custom modal"
        close={() => setModal((l) => !l)}
      >
        <div>Modal body</div>
      </Modal>
      <Popover className="relative w-fit">
        <Popover.Button className="cursor-pointer rounded border border-gray-50 p-1 text-xs font-semibold text-white shadow duration-200 hover:bg-gray-50 hover:text-accent-color focus:outline-dashed focus:outline-2 focus:outline-offset-2 focus:outline-sky-500 active:focus:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
          <BsThreeDotsVertical size={15} />
        </Popover.Button>
        <Popover.Panel className="absolute bottom-0 right-0">
          <button className="flex w-full items-center justify-between gap-4 rounded px-2 py-1 hover:bg-gray-700">
            <span>Delete</span>
            <span>
              <FaTrashCan />
            </span>
          </button>
          <button className="flex w-full items-center justify-between gap-4 rounded px-2 py-1 hover:bg-gray-700">
            <span>Edit</span>
            <span>
              <CiEdit strokeWidth={1} />
            </span>
          </button>
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export default ModalPage;
