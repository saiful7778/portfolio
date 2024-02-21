"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "./utilities/Button";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ open, title, description, close, children }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[110] flex h-screen w-full items-center justify-center bg-gray-900/70 text-white"
        onClose={close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="relative max-h-96 w-full max-w-xl overflow-auto rounded border border-gray-700 bg-gray-800 p-3 shadow">
            <Button
              className="float-right"
              onClick={close}
              variant="cancel"
              shape="circle"
            >
              <RxCross2 />
            </Button>
            {title && (
              <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
            )}
            {description && <Dialog.Title>{description}</Dialog.Title>}
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
