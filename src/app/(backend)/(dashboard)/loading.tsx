import Spinner from "@/components/Spinner";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      <Spinner size={40} />
    </div>
  );
};

export default Loading;
