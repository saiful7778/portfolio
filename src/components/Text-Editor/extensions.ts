import { mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import BaseHeading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
// syntax highlight
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import "highlight.js/styles/a11y-dark.min.css";
import { common, createLowlight } from "lowlight";
const lowlight = createLowlight(common);

const headingClasses: string[] = [
  "text-3xl font-bold",
  "text-2xl font-bold",
  "text-xl font-bold",
  "text-lg font-bold",
  "text-base font-bold",
];

const Heading = BaseHeading.configure({ levels: [2, 3, 4, 5, 6] }).extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level: number = hasLevel ? node.attrs.level : this.options.levels[0];
    console.log({ length: headingClasses.length, level, idxLevel: level - 2 });
    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `${headingClasses[level - 2]}`,
        "placeholder-data": `Heading 0${level}`,
      }),
      0,
    ];
  },
});

export default function extension({
  placeholder,
  limit,
}: {
  placeholder: string;
  limit: number;
}) {
  return [
    Document,
    StarterKit.configure({
      bulletList: {
        HTMLAttributes: {
          class: "list-disc ml-5",
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: "list-decimal ml-5",
        },
      },
    }),
    Heading,
    Placeholder.configure({
      placeholder,
    }),
    HorizontalRule.configure({
      HTMLAttributes: {
        class: "!my-4",
      },
    }),
    Blockquote.configure({
      HTMLAttributes: {
        class: "border-l-4 text-sm my-4 pl-2",
      },
    }),
    Underline.configure({
      HTMLAttributes: {
        class: "underline",
      },
    }),
    CharacterCount.configure({
      limit: limit,
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      HTMLAttributes: {
        class: "underline text-blue-500 cursor-pointer",
      },
    }),
    Image,
    Highlight.configure({
      HTMLAttributes: {
        class: "bg-yellow-300 rounded-sm px-0.5 mx-0.5",
      },
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    CodeBlockLowlight.configure({
      lowlight,
      HTMLAttributes: {
        class: "code-block",
      },
    }),
  ];
}
