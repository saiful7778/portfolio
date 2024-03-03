import { mergeAttributes } from "@tiptap/core";

// Nodes function file import
import StarterKit from "@tiptap/starter-kit";
import BaseHeading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";

// image function file import
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";

// Marks function file import
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

// code function file import
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

// other function file import
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";

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
        "placeholder-data": `Heading 0${level}`,
      }),
      0,
    ];
  },
});

const extension = ({ placeholder, limit }) => {
  return [
    StarterKit.configure({
      paragraph: {
        HTMLAttributes: {
          class: "text-base",
        },
      },
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
    ImageResize,
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
    }),
  ];
};

export default extension;
