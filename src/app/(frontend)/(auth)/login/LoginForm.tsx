"use client";
import Button from "@/components/ui/button";
import Form from "@/components/ui/form";
import Input from "@/components/ui/input";
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

interface LoginFormProps {
  callbackUrl?: string;
}

const LoginForm: FC<LoginFormProps> = ({ callbackUrl }) => {
  const [spinner, setSpinner] = useState<boolean>(false);
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
      setSpinner(false);
    };
  };

  const handleSubmit = async (e: z.infer<typeof loginSchema>) => {
    setSpinner(true);
    const reset = handleReset();
    try {
      if (showReCaptchaState) {
        if (!recaptchaToken) {
          toast({
            variant: "destructive",
            title: "Please verify the reCAPTCHA!",
          });
          setSpinner(false);
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
        <Form.field
          control={form.control}
          name="email"
          render={({ field }) => (
            <Form.item>
              <Form.label>Email address</Form.label>
              <Form.control>
                <Input
                  type="email"
                  placeholder="Email address"
                  {...field}
                  disabled={spinner}
                />
              </Form.control>
              <Form.message />
            </Form.item>
          )}
        />
        <Form.field
          control={form.control}
          name="password"
          render={({ field }) => <Password spinner={spinner} {...field} />}
        />
        {showReCaptchaState && (
          <ReCAPTCHA
            onChange={(token) => setRecaptchaToken(token)}
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY!}
          />
        )}
        <Button className="w-full" size="lg" type="submit" disabled={spinner}>
          {spinner ? <Spinner /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
