import Graphic01 from "./graphics/Graphic-01";
import Graphic04 from "./graphics/Graphic-04";

const SectionTitle = ({ title, text, blob }) => {
  return (
    <div className="relative my-16 text-center">
      {blob && (
        <div className="absolute -left-0 -top-10 h-[200px] w-[500px] rotate-45 rounded-full bg-blue-blob blur-[100px] filter"></div>
      )}
      <div className="relative mx-auto my-16 w-fit">
        <div className="absolute -left-20 top-0 z-10">
          <Graphic01 />
        </div>
        <h3 className="text-6xl font-bold">{title}</h3>
        <p className="leading-10 text-gray-400">{text}</p>
        <div className="absolute -right-20 top-0 z-10">
          <Graphic04 />
        </div>
      </div>
      {blob && (
        <div className="absolute -right-0 -top-10 h-[200px] w-[500px] -rotate-[20deg] rounded-full bg-red-blob blur-[100px] filter"></div>
      )}
    </div>
  );
};

export default SectionTitle;
