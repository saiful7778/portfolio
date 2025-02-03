import { cn } from "@/lib/shadcn/utils";
import { forwardRef } from "react";

const CursorFollow = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "pointer-events-none absolute left-0 top-0 z-[100] size-[30px] max-md:hidden",
      className
    )}
    {...props}
  >
    <div className="pointer-events-none fixed z-[100] box-border size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(34,34,34,0.1)] after:absolute after:left-1/2 after:top-1/2 after:size-[3px] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:content-['']" />
  </div>
));
CursorFollow.displayName = "CursorFollow";

export default CursorFollow;
