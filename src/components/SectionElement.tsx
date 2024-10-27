import Graphic01 from "@/components/graphics/Graphic-01";
import Graphic04 from "@/components/graphics/Graphic-04";
import { DestructiveColorBlob, PrimaryColorBlob } from "./GradientBlob";

interface SectionElementProps {
  blob?: boolean;
  title: string;
  text?: string;
  children: React.ReactNode;
}

const SectionElement: React.FC<SectionElementProps> = ({
  blob,
  title,
  text,
  children,
}) => {
  return (
    <section className="my-20">
      <div className="relative mb-20 text-center">
        {blob && (
          <>
            <DestructiveColorBlob className="-left-44 top-0 h-[200px] w-[500px]" />
            <PrimaryColorBlob className="-right-52 top-0 h-[100px] w-[500px]" />
          </>
        )}
        <div className="relative mx-auto w-fit">
          <div className="absolute -left-20 top-0 z-0 animate-rotate-scale">
            <Graphic01 />
          </div>
          <h3 className="text-6xl font-bold">{title}</h3>
          <p className="leading-10 text-muted-foreground">{text}</p>
          <div className="absolute -right-20 top-0 z-0">
            <Graphic04 />
          </div>
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
};

export default SectionElement;
