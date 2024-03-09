import Spinner from "@/components/Spinner";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      <Spinner size={40} />
    </div>
  );
};

export default Loading;
