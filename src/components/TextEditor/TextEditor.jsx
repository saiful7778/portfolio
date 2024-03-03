"use client";
import cn from "@/lib/cn";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import TextEditorToolbar from "./TextEditorToolbar";
import { focus, input } from "@/theme";
import { useField } from "formik";
import extension from "./TextEditorExtension";
import { TextHtmlFormat, TextStyle } from "./ToolsComp";

const style = {
  base: "h-[600px] overflow-auto",
};

const TextEditor = ({ name, placeholder = "Write....", content = "" }) => {
  const formik = useField(name);
  const { error } = formik[1];
  const { setValue } = formik[2];

  const limit = 5000;

  const editor = useEditor({
    extensions: extension({ placeholder, limit }),
    editorProps: {
      attributes: {
        class: cn(input.base, style.base, focus.base),
      },
    },
    content,
    onUpdate({ editor }) {
      setValue(JSON.stringify(editor.getJSON()));
    },
  });

  if (!editor) {
    return null;
  }
  return (
    <>
      <TextEditorToolbar editor={editor} />
      <div className="relative">
        {editor && (
          <BubbleMenu
            className="flex items-center gap-1 rounded-md border border-gray-700 bg-gray-900"
            tippyOptions={{ duration: 500 }}
            editor={editor}
          >
            <TextStyle editor={editor} />
          </BubbleMenu>
        )}
        {editor && (
          <FloatingMenu
            className="flex items-center gap-1 rounded-md border border-gray-700 bg-gray-900"
            tippyOptions={{ duration: 500 }}
            editor={editor}
          >
            <TextHtmlFormat editor={editor} />
          </FloatingMenu>
        )}
        <EditorContent editor={editor} />
        <div className="absolute bottom-1 right-1.5 z-50 text-xs text-gray-400">
          {editor.storage.characterCount.characters()}/{limit}
        </div>
      </div>
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </>
  );
};

export default TextEditor;
