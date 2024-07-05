"use client";
import { FC } from "react";
import { ToolbarProps } from "../Toolbar";
import { Toggle } from "@/components/ui/toggle";
import { List, ListOrdered } from "lucide-react";

const ListTool: FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const handleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const handleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  return (
    <>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive("bulletList")}
        onPressedChange={handleBulletList}
      >
        <List size={15} />
      </Toggle>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive("orderedList")}
        onPressedChange={handleOrderedList}
      >
        <ListOrdered size={15} />
      </Toggle>
    </>
  );
};

export default ListTool;
