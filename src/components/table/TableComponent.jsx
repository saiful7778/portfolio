import cn from "@/lib/utils/cn";

export const TableMain = ({ children }) => {
  return (
    <div className="w-full overflow-auto border border-gray-700">
      <div className="relative">
        <table className="w-full overflow-auto">{children}</table>
      </div>
    </div>
  );
};

export const TableCaption = ({ children }) => {
  return <caption className="bg-gray-800 p-0.5 text-sm">{children}</caption>;
};

export const TableHead = ({ className, children }) => {
  return (
    <thead
      className={cn(
        "text-metal-400 border-y border-gray-700 bg-gray-800 text-xs font-normal",
        className,
      )}
    >
      <tr className="divide-x divide-gray-700">{children}</tr>
    </thead>
  );
};

export const TableHeadCell = ({ className, children }) => {
  return (
    <th className={cn("px-1 py-0.5 font-normal", className)}>{children}</th>
  );
};

export const TableBody = ({ className, children }) => {
  return (
    <tbody className={cn("divide-y divide-gray-700 text-sm", className)}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children }) => {
  return (
    <tr className="divide-x divide-gray-700 even:bg-gray-800 hover:bg-gray-800/80">
      {children}
    </tr>
  );
};

export const TableCell = ({ className, children }) => {
  return <td className={cn("px-1.5 py-1", className)}>{children}</td>;
};
