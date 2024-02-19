import cn from "@/lib/cn";

const style = {
  base: "cursor-pointer rounded w-7 h-7 inline-flex items-center justify-center font-semibold shadow border border-gray-50 duration-200 active:focus:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
  inActive: "hover:bg-gray-50 hover:text-accent-color",
  isActive: "bg-gray-50 text-accent-color",
};

const Tool = ({ onClick, isActive, children, tag, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={cn(style.base, isActive ? style.isActive : style.inActive)}
      type="button"
      title={tag}
      {...props}
    >
      {children}
    </button>
  );
};

export default Tool;
