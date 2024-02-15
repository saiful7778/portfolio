"use client";
import cn from "@/lib/cn";
import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import TextEditorToolbar from "./TextEditorToolbar";
import BaseHeading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import CodeBlock from "@tiptap/extension-code-block";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import { mergeAttributes } from "@tiptap/core";
import Link from "@tiptap/extension-link";
import { focus, input } from "@/theme";

const style = {
  base: "h-[600px] overflow-auto",
};

const classes = {
  1: "text-4xl font-bold",
  2: "text-3xl font-bold",
  3: "text-2xl font-bold",
  4: "text-xl font-bold",
  5: "text-lg font-bold",
  6: "text-base font-bold",
};

const Heading = BaseHeading.configure({ levels: [1, 2, 3, 4, 5, 6] }).extend({
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

const TextEditorComp = ({ placeholder = "Write....", onChange }) => {
  const limit = 2000;

  const editor = useEditor({
    extensions: [
      StarterKit,
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
          class: "list-decimal ml-2",
        },
      }),
      CodeBlock.configure({
        languageClassPrefix: "language-js",
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(input.base, style.base, focus.base),
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }
  return (
    <div>
      <TextEditorToolbar editor={editor} />
      <div className="relative">
        <EditorContent editor={editor} />
        <div className="absolute bottom-1 right-1.5 z-50 text-xs text-gray-400">
          {editor.storage.characterCount.characters()}/{limit}
        </div>
      </div>
    </div>
  );
};

export default TextEditorComp;
