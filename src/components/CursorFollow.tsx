"use client";
import { cn } from "@/lib/shadcn/utils";
import { forwardRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";

const CursorFollow = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Apply spring transition for smooth movement
    const smoothCursorX = useSpring(cursorX, {
      stiffness: 150,
      damping: 25,
      mass: 0.8,
    });
    const smoothCursorY = useSpring(cursorY, {
      stiffness: 150,
      damping: 25,
      mass: 0.8,
    });

    useEffect(() => {
      const moveCursor = (e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };

      window.addEventListener("mousemove", moveCursor);

      return () => {
        window.removeEventListener("mousemove", moveCursor);
      };
    }, [cursorX, cursorY]);

    return (
      <motion.div
        ref={ref}
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-[100] size-10 max-md:hidden",
          className
        )}
        style={{
          translateX: smoothCursorX,
          translateY: smoothCursorY,
        }}
        {...props}
      >
        <div className="pointer-events-none fixed z-[100] box-border size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(34,34,34,0.1)] after:absolute after:left-1/2 after:top-1/2 after:size-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-accent after:content-['']" />
      </motion.div>
    );
  }
);

CursorFollow.displayName = "CursorFollow";

export default CursorFollow;
