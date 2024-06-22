"use client";
import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import Form from "@/components/ui/form";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Switch from "@/components/ui/switch";
import revalidate from "@/lib/actions/revalidate";
import updateUser from "@/lib/actions/user/updateUser";
import { updateUserSchema } from "@/lib/schemas/auth";
import toast from "@/lib/toast/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateUserProps {
  user?: {
    name?: string;
    email?: string;
    access?: boolean;
    role?: "user" | "admin";
  };
}

const UpdateUser: FC<UpdateUserProps> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      access: user?.access,
      role: user?.role,
    },
  });

  const handleReset = () => {
    return () => {
      form.reset();
      setLoading(false);
    };
  };

  const handleSubmit = async (e: z.infer<typeof updateUserSchema>) => {
    setLoading(true);
    const reset = handleReset();
    try {
      await updateUser(e);
      await revalidate("/dashboard");
      toast({
        title: "User data is updated",
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
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4 py-4">
          <Form.field
            control={form.control}
            name="name"
            render={({ field }) => (
              <Form.item className="grid grid-cols-4 items-center gap-4">
                <Form.label>Full name</Form.label>
                <Form.control>
                  <Input
                    className="col-span-3"
                    type="text"
                    placeholder="Full name"
                    disabled={loading}
                    {...field}
                  />
                </Form.control>
                <Form.message />
              </Form.item>
            )}
          />
          <Form.field
            control={form.control}
            name="email"
            render={({ field }) => (
              <Form.item className="grid grid-cols-4 items-center gap-4">
                <Form.label>Email</Form.label>
                <Form.control>
                  <Input
                    className="col-span-3"
                    type="email"
                    placeholder="Email address"
                    disabled={true}
                    {...field}
                  />
                </Form.control>
                <Form.message />
              </Form.item>
            )}
          />
          <Form.field
            control={form.control}
            name="role"
            render={({ field }) => (
              <Form.item className="grid grid-cols-4 items-center gap-4">
                <Form.label>User role</Form.label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <Form.control>
                    <Select.trigger className="col-span-3" disabled={loading}>
                      <Select.value placeholder="Select user role" />
                    </Select.trigger>
                  </Form.control>
                  <Select.content>
                    <Select.item value="user">user</Select.item>
                    <Select.item value="admin">admin</Select.item>
                  </Select.content>
                </Select>
                <Form.message />
              </Form.item>
            )}
          />
          <Form.field
            control={form.control}
            name="access"
            render={({ field }) => (
              <Form.item className="grid grid-cols-4 items-center gap-4">
                <Form.label>User access</Form.label>
                <Form.control>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Form.control>
                <Form.message />
              </Form.item>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">{loading ? <Spinner /> : "Update user"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUser;
