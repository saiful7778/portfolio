"use client";
import ModalComp from "@/components/ModalComp";
import Button from "@/components/utilities/Button";
import { useState } from "react";

const Details = ({ data }) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Button onClick={() => setModal((l) => !l)} variant="confirm" size="sm">
        Details
      </Button>
      <ModalComp open={modal} close={() => setModal((l) => !l)} title="Details">
        <div>{data}</div>
      </ModalComp>
    </>
  );
};

export default Details;
