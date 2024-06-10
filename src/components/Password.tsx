"use client";
import { forwardRef, useState } from "react";
import Form from "@/components/ui/form";
import Input, { InputProps } from "@/components/ui/input";
import Button from "./ui/button";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends InputProps {
  spinner: boolean;
}

const Password = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ spinner, ...props }, ref) => {
    const [showPass, setShowPass] = useState<boolean>(false);
    return (
      <Form.item>
        <Form.label>Password</Form.label>
        <Form.control>
          <div className="relative">
            <Input
              ref={ref}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              disabled={spinner}
              {...props}
            />
            <div className="absolute right-2 top-[15%]">
              <Button
                type="button"
                onClick={() => setShowPass((prop) => !prop)}
                variant="ghost"
                size="icon"
              >
                {showPass ? <Eye /> : <EyeOff />}
              </Button>
            </div>
          </div>
        </Form.control>
        <Form.message />
      </Form.item>
    );
  },
);

Password.displayName = "Password";

export default Password;
