"use client";
import Button from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { loginSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { z } from "zod";
import { FC, useState } from "react";
import useStateData from "@/hooks/useStateData";
import { signIn } from "next-auth/react";
import { defaultLoginRedirect } from "@/lib/routes";
import reCaptcha from "@/lib/reCaptcha";
import useToast from "@/hooks/useToast";
import login from "@/lib/actions/auth/login";
import { ToastAction } from "@/components/ui/toast";
import sendVerifyEmail from "@/lib/actions/email/sendVerifyEmail";
import Spinner from "@/components/Spinner";
import Password from "@/components/Password";
import InputField from "@/components/InputField";

interface LoginFormProps {
  callbackUrl?: string;
}

const LoginForm: FC<LoginFormProps> = ({ callbackUrl }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const { toast } = useToast();

  const { showReCaptcha } = useStateData();
  const showReCaptchaState =
    showReCaptcha.show === "on" ||
    (showReCaptcha.show === "custom" && showReCaptcha.page.includes("login"));

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleReset = () => {
    return () => {
      form.reset();
      setLoading(false);
    };
  };

  const handleSubmit = async (e: z.infer<typeof loginSchema>) => {
    setLoading(true);
    const reset = handleReset();
    try {
      if (showReCaptchaState) {
        if (!recaptchaToken) {
          toast({
            variant: "destructive",
            title: "Please verify the reCAPTCHA!",
          });
          setLoading(false);
          return;
        }

        const captcha = await reCaptcha(recaptchaToken);
        if (!captcha) {
          reset();
          return;
        }
      }
      const res = await login(e);
      if (!res.success) {
        if (res.message === "Email is not verified") {
          toast({
            variant: "destructive",
            title: "Email is not verified",
            action: (
              <ToastAction
                onClick={() => sendVerifyEmail(e.email)}
                altText="Email verify mail end"
              >
                Send verify email
              </ToastAction>
            ),
          });
          return;
        }
        throw new Error(res.message);
      }
      await signIn("credentials", {
        email: e.email,
        password: e.password,
        redirect: true,
        callbackUrl: callbackUrl || defaultLoginRedirect,
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
      reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <InputField
              label="Email address"
              type="email"
              placeholder="Email address"
              disabled={loading}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => <Password loading={loading} {...field} />}
        />
        {showReCaptchaState && (
          <ReCAPTCHA
            onChange={(token) => setRecaptchaToken(token)}
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY!}
          />
        )}
        <Button className="w-full" size="lg" type="submit" disabled={loading}>
          {loading ? <Spinner size={15} /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
