import cn from "@/lib/utils/cn";
import { FC } from "react";

const style = {
  base: "absolute z-0 h-[300px] w-[900px] rounded-full blur-[100px] filter",
  primary: "bg-primary/20 rotate-45",
  destructive: "bg-destructive/40 -rotate-[20deg]",
};

interface BlobProps {
  className: string;
}

export const PrimaryColorBlob: FC<BlobProps> = ({ className }) => {
  return <div className={cn(style.base, style.primary, className)} />;
};

export const DestructiveColorBlob: FC<BlobProps> = ({ className }) => {
  return <div className={cn(style.base, style.destructive, className)} />;
};
