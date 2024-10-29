"use client";
import { Form, FormField } from "@/components/ui/form";
import { registrationSchema } from "@/lib/schema/authSchema";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/button";
import PasswordField from "@/components/form/PasswordField";
import { useState } from "react";
import InputField from "@/components/form/InputField";
import Spinner from "@/components/Spinner";
import registerAction from "@/lib/actions/auth/registerAction";

const RegistrationForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof registrationSchema>) => {
    try {
      setLoading(true);

      const res = await registerAction(values);

      if (!res.success) {
        throw new Error(res?.error);
      }
      console.log(res.data);
      form.reset();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    } finally {
      setLoading(false);
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
          name="fullName"
          render={({ field }) => (
            <InputField
              type="text"
              label="Full name"
              placeholder="Full name"
              autoComplete="name"
              disabled={loading}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <InputField
              type="email"
              label="Email address"
              placeholder="Email address"
              autoComplete="email"
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
              autoComplete="new-password"
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <PasswordField
              label="Confirm Password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              disabled={loading}
              {...field}
            />
          )}
        />
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? <Spinner size={20} /> : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;
