import cn from "@/lib/cn";

const style = {
  base: "cursor-pointer rounded w-7 h-7 inline-flex items-center duration-200 justify-center font-semibold disabled:cursor-not-allowed disabled:opacity-50",
  inActive: "hover:bg-gray-700",
  isActive: "bg-gray-800",
};

const Tool = ({ className, onClick, isActive, children, tag, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        style.base,
        isActive ? style.isActive : style.inActive,
        className,
      )}
      type="button"
      title={tag}
      {...props}
    >
      {children}
    </button>
  );
};

export default Tool;
