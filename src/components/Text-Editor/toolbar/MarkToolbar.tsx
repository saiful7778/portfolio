"use client";
import { FC } from "react";
import type { ToolbarProps } from "../Toolbar";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  Highlighter,
  Strikethrough,
  Code,
  Underline,
} from "lucide-react";
import LinkTool from "./LinkTool";

const MarkToolbar: FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const handleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const handleHighlight = () => {
    editor.chain().focus().toggleHighlight().run();
  };

  const handleUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
  };

  const handleStrike = () => {
    editor.chain().focus().toggleStrike().run();
  };

  const handleCode = () => {
    editor.chain().focus().toggleCode().run();
  };

  return (
    <>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive("bold")}
        onPressedChange={handleBold}
      >
        <Bold size={15} />
      </Toggle>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive("italic")}
        onPressedChange={handleItalic}
      >
        <Italic size={15} />
      </Toggle>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive("highlight")}
        onPressedChange={handleHighlight}
      >
        <Highlighter size={15} />
      </Toggle>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive("underline")}
        onPressedChange={handleUnderline}
      >
        <Underline size={15} />
      </Toggle>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive("strike")}
        onPressedChange={handleStrike}
      >
        <Strikethrough size={15} />
      </Toggle>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive("code")}
        onPressedChange={handleCode}
      >
        <Code size={15} />
      </Toggle>
      <LinkTool pressed={editor.isActive("link")} editor={editor} />
    </>
  );
};

export default MarkToolbar;
