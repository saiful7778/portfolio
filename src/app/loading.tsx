import Spinner from "@/components/Spinner";

const Loading: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      <Spinner size={60} />
    </div>
  );
};

export default Loading;
