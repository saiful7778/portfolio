import cn from "@/lib/cn";

const switchStyle = {
  base: "relative inline-flex items-center rounded-full h-6 w-11 border",
  state: {
    offClick: "bg-gray-800 border-gray-700",
    onClick: "bg-blue-700 border-blue-600",
  },
  pointer: {
    base: "relative pointer-events-none inline-block transform rounded-full bg-white shadow transition duration-200 ease-in-out h-5 w-5",
    on: "translate-x-[21px]",
    off: "translate-x-[2px]",
  },
};

const Switch = ({ state, onChange }) => {
  return (
    <button
      className={cn(
        switchStyle.base,
        state ? switchStyle.state.onClick : switchStyle.state.offClick,
      )}
      onClick={onChange}
      role="switch"
      type="button"
      aria-checked={state}
      data-headlessui-state={`${state ? "checked" : ""}`}
      title={state ? "on" : "off"}
    >
      <span
        className={cn(
          switchStyle.pointer.base,
          state ? switchStyle.pointer.on : switchStyle.pointer.off,
        )}
      ></span>
    </button>
  );
};

export default Switch;
