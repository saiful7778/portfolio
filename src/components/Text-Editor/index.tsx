"use client";
import { FC } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import extension from "./extensions";
import Toolbar from "./Toolbar";
import Skeleton from "../ui/skeleton";

interface TextEditorProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
}

const TextEditor: FC<TextEditorProps> = ({
  defaultValue,
  placeholder = "Write....",
  onChange,
  label,
  required,
}) => {
  const limit = 10000;

  const editor = useEditor({
    extensions: extension({ placeholder, limit }),
    content: defaultValue,
    editorProps: {
      attributes: {
        class:
          "min-h-[500px] max-h-[600px] overflow-auto w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()));
    },
  });

  if (!editor) {
    return (
      <div className="relative space-y-2">
        <Skeleton className="h-[17px] w-[88px]" />
        <Skeleton className="h-[40px] w-[1141px]" />
        <Skeleton className="h-[500px] w-[1141px]" />
      </div>
    );
  }

  return (
    <FormItem className="relative space-y-2">
      {label && (
        <FormLabel id={`${label}-id`}>
          {label} {required && <span className="text-destructive">*</span>}
        </FormLabel>
      )}
      <Toolbar editor={editor} />
      <FormControl>
        <EditorContent id={`${label}-id`} editor={editor} />
      </FormControl>
      <div className="absolute bottom-1 right-1.5 z-50 text-xs text-gray-400">
        {editor.storage.characterCount.characters()}/{limit}
      </div>
      <FormMessage />
    </FormItem>
  );
};

export default TextEditor;
