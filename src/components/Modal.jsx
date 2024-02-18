"use client";
// components
import { createPortal } from "react-dom";
import Button from "./utilities/Button";
// icons
import { RxCross2 } from "react-icons/rx";

const Modal = ({ openModal, closeModal, modalTitle, children }) => {
  return (
    openModal &&
    createPortal(
      <div
        className="fixed inset-0 z-[150] flex h-screen w-full items-center justify-center bg-gray-900/70 text-white"
        role="dialog"
        data-testid="modal"
        hidden={!openModal}
      >
        <div className="relative max-h-96 w-full max-w-xl overflow-auto rounded border border-gray-700 bg-gray-800 p-3 shadow">
          <div className="flex items-center justify-between gap-2">
            {modalTitle && (
              <h4 className="text-xl font-semibold">{modalTitle}</h4>
            )}
            <Button
              className="ml-auto"
              onClick={closeModal}
              variant="cancel"
              shape="circle"
            >
              <RxCross2 />
            </Button>
          </div>
          {children}
        </div>
      </div>,
      document.body,
    )
  );
};

export default Modal;
