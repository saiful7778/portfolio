import type { ReactNode } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export interface DialogManage {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
