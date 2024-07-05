"use client";
import { forwardRef, useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Input from "@/components/ui/input";
import Button from "./ui/button";
import { Eye, EyeOff } from "lucide-react";
import type { InputProps } from "@/types/types";

interface InputFieldProps extends InputProps {
  loading: boolean;
}

const Password = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ loading, ...props }, ref) => {
    const [showPass, setShowPass] = useState<boolean>(false);

    return (
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <div className="relative">
            <Input
              ref={ref}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              disabled={loading}
              {...props}
            />
            <div className="absolute right-2 top-[15%]">
              <Button
                type="button"
                onClick={() => setShowPass((prop) => !prop)}
                variant="ghost"
                disabled={loading}
                size="icon"
              >
                {showPass ? <Eye /> : <EyeOff />}
              </Button>
            </div>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  },
);

Password.displayName = "Password";

export default Password;
