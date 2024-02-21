"use client";
import cn from "@/lib/cn";
import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import StarterKit from "@tiptap/starter-kit";
import TextEditorToolbar from "./TextEditorToolbar";
import Image from "@tiptap/extension-image";
import BaseHeading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import ImageResize from "tiptap-extension-resize-image";
import { common, createLowlight } from "lowlight";
import { mergeAttributes } from "@tiptap/core";
import Link from "@tiptap/extension-link";
import { focus, input } from "@/theme";
import { useField } from "formik";
import FloatingMenu from "./FloatingMenu";

const style = {
  base: "h-[600px] overflow-auto",
};
const lowlight = createLowlight(common);

const classes = {
  2: "text-3xl font-bold",
  3: "text-2xl font-bold",
  4: "text-xl font-bold",
  5: "text-lg font-bold",
  6: "text-base font-bold",
};

const Heading = BaseHeading.configure({ levels: [2, 3, 4, 5, 6] }).extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `${classes[level]}`,
      }),
      0,
    ];
  },
});

const TextEditorComp = ({ name, placeholder = "Write....", content = "" }) => {
  const formik = useField(name);
  const { error } = formik[1];
  const { setValue } = formik[2];

  const limit = 5000;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "underline text-blue-500 cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Heading,
      ImageResize.configure({
        HTMLAttributes: {
          class: "Image",
        },
      }),
      Image.configure({
        allowBase64: true,
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-300 rounded-sm px-0.5 mx-0.5",
        },
      }),
      CharacterCount.configure({
        limit: limit,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-2",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-5",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(input.base, style.base, focus.base),
      },
    },
    content,
    onUpdate({ editor }) {
      setValue(editor.getJSON());
    },
  });

  if (!editor) {
    return null;
  }
  return (
    <>
      <TextEditorToolbar editor={editor} />
      <div className="relative">
        <FloatingMenu editor={editor} />
        <EditorContent editor={editor} />
        <div className="absolute bottom-1 right-1.5 z-50 text-xs text-gray-400">
          {editor.storage.characterCount.characters()}/{limit}
        </div>
      </div>
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </>
  );
};

export default TextEditorComp;
