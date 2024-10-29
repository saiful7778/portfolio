"use client";
import InputField from "@/components/form/InputField";
import PasswordField from "@/components/form/PasswordField";
import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import userCheckAction from "@/lib/actions/auth/userCheckAction";
import { loginSchema } from "@/lib/schema/authSchema";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/staticData";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

interface LoginFormProps {
  callbackUrl?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ callbackUrl }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);

      const res = await userCheckAction(values);

      if (!res.success) {
        switch (res.message) {
          case "Email is not verified":
            toast({
              variant: "destructive",
              title: "Email is not verified",
              action: (
                <ToastAction altText="Email verify mail end">
                  Send verify email
                </ToastAction>
              ),
            });
            return;

          default:
            throw new Error(res.message);
        }
      }

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      });

      toast({
        title: "You're logged in",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: err.message,
        });
      }
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <InputField
              type="email"
              label="Email address"
              placeholder="Email address"
              required
              disabled={loading}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <PasswordField
              label="Password"
              placeholder="Password"
              disabled={loading}
              {...field}
            />
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size={20} /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
