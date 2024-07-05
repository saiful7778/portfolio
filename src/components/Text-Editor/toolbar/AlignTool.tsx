"use client";
import { FC } from "react";
import { ToolbarProps } from "../Toolbar";
import { Toggle } from "@/components/ui/toggle";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

const AlignTool: FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const handleAlignLeft = () => {
    editor.chain().focus().setTextAlign("left").run();
  };

  const handleAlignCenter = () => {
    editor.chain().focus().setTextAlign("center").run();
  };

  const handleAlignRight = () => {
    editor.chain().focus().setTextAlign("right").run();
  };

  const handleAlignJustify = () => {
    editor.chain().focus().setTextAlign("justify").run();
  };

  return (
    <>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={handleAlignLeft}
      >
        <AlignLeft size={15} />
      </Toggle>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={handleAlignCenter}
      >
        <AlignCenter size={15} />
      </Toggle>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={handleAlignRight}
      >
        <AlignRight size={15} />
      </Toggle>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive({ textAlign: "justify" })}
        onPressedChange={handleAlignJustify}
      >
        <AlignJustify size={15} />
      </Toggle>
    </>
  );
};

export default AlignTool;
