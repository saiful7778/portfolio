"use client";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import useStateData from "@/hooks/useStateData";
import { FC, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { projectSchema } from "@/lib/schemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/button";
import Spinner from "../Spinner";
import ReCAPTCHA from "react-google-recaptcha";
import InputField from "../InputField";
import SelectItem from "../SelectItem";
import Switch from "../ui/switch";
import Label from "../ui/label";
import Textarea from "../ui/textarea";
import TagInput from "../TagInput";
import TextEditor from "../Text-Editor";

const ProjectForm: FC = () => {
  const [editSlug, setEditSlug] = useState<boolean>(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { edgestore } = useEdgeStore();
  const { showReCaptcha } = useStateData();

  const showReCaptchaState =
    showReCaptcha.show === "on" ||
    (showReCaptcha.show === "custom" &&
      showReCaptcha.page.includes("projectAdd"));

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      status: "public",
      slug: "",
      githubUrl: "",
      projectLiveUrl: "",
      tags: [""],
      shortDes: "",
      description: "",
    },
  });

  const handleSubmit = async (e: z.infer<typeof projectSchema>) => {
    setLoading(true);
    console.log(e);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <div className="grid grid-cols-4 gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <InputField
                className="col-span-3"
                label="Project title"
                type="text"
                placeholder="Title"
                disabled={loading}
                required
                maxLength={100}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  form.trigger("slug");
                  form.setValue(
                    "slug",
                    e.target.value
                      .replace(/[-_]/g, "")
                      .split(" ")
                      .join("_")
                      .toLowerCase(),
                  );
                }}
              />
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <SelectItem
                label="Project status"
                placeholder="Select project status"
                disabled={loading}
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
                selectValue={[
                  { text: "Private", value: "private" },
                  { text: "Public", value: "public" },
                ]}
              />
            )}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label>Edit slug</Label>
          <Switch checked={editSlug} onCheckedChange={setEditSlug} />
        </div>
        {editSlug && (
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <InputField
                className="col-span-3"
                label="Slug"
                type="text"
                placeholder="Edit slug"
                disabled={!editSlug || loading}
                required
                readOnly={!editSlug}
                {...field}
              />
            )}
          />
        )}
        <div className="flex w-full items-end gap-2">
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <InputField
                className="w-full"
                type="url"
                label="Github link"
                placeholder="Code link"
                disabled={loading}
                required
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="projectLiveUrl"
            render={({ field }) => (
              <InputField
                className="w-full"
                type="url"
                label="Project link"
                placeholder="Live link"
                disabled={loading}
                required
                {...field}
              />
            )}
          />
        </div>
        <TagInput setValue={(value) => form.setValue("tags", value)} />
        <FormField
          control={form.control}
          name="shortDes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Short description <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Project short description"
                  minLength={1}
                  maxLength={200}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <TextEditor
              label="Description"
              defaultValue={field.value}
              onChange={field.onChange}
              placeholder="Project description"
              required
            />
          )}
        />
        {showReCaptchaState && (
          <ReCAPTCHA
            onChange={(token) => setRecaptchaToken(token)}
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY!}
          />
        )}
        <Button size="lg" type="submit" disabled={loading}>
          {loading ? <Spinner size={15} /> : "New project"}
        </Button>
      </form>
    </Form>
  );
};

export default ProjectForm;
