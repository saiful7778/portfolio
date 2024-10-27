import { cn } from "@/lib/utils";

const style = {
  base: "absolute z-0 h-[300px] w-[900px] rounded-full blur-[100px] filter",
  primary: "bg-primary/20 rotate-45",
  destructive: "bg-destructive/20 -rotate-[30deg]",
};

interface BlobProps {
  className: string;
}

export const PrimaryColorBlob: React.FC<BlobProps> = ({ className }) => {
  return <div className={cn(style.base, style.primary, className)} />;
};

export const DestructiveColorBlob: React.FC<BlobProps> = ({ className }) => {
  return <div className={cn(style.base, style.destructive, className)} />;
};
