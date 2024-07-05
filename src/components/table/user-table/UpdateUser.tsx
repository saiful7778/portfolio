"use client";
import InputField from "@/components/InputField";
import SelectItem from "@/components/SelectItem";
import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Switch from "@/components/ui/switch";
import updateUser from "@/lib/actions/user/updateUser";
import { updateUserSchema } from "@/lib/schemas/auth";
import toast from "@/lib/toast/toast";
import type { DialogManage } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateUserProps extends DialogManage {
  name: string;
  email: string;
  access: boolean;
  role: "user" | "admin";
}

const UpdateUser: FC<UpdateUserProps> = ({
  name,
  email,
  access,
  role,
  open,
  onOpenChange,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: name,
      email: email,
      access: access,
      role: role,
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
      const res = await updateUser(e);
      if (!res) {
        throw new Error("User is not updated");
      }
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update user details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <InputField
                  label="Full Name"
                  type="text"
                  placeholder="Full name"
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
                  label="Email address"
                  type="email"
                  placeholder="Email address"
                  disabled={true}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <SelectItem
                  label="User role"
                  placeholder="Select user role"
                  disabled={loading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  selectValue={[
                    { text: "User", value: "user" },
                    { text: "Admin", value: "admin" },
                  ]}
                />
              )}
            />
            <FormField
              control={form.control}
              name="access"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border bg-background p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">User access</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {loading ? <Spinner /> : "Update user"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUser;
