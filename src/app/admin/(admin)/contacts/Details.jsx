"use client";
import Modal from "@/components/Modal";
import Button from "@/components/utilities/Button";
import { useState } from "react";

const Details = ({ data }) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Button onClick={() => setModal((l) => !l)} variant="confirm" size="sm">
        Details
      </Button>
      <Modal
        openModal={modal}
        closeModal={() => setModal((l) => !l)}
        modalTitle="Details"
      >
        <div>{data}</div>
      </Modal>
    </>
  );
};

export default Details;
