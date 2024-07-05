"use client";
import { FC } from "react";
import { type Editor } from "@tiptap/react";
import Separator from "../ui/separator";
import HeadingToolbar from "./toolbar/HeadingToolbar";
import MarkToolbar from "./toolbar/MarkToolbar";
import AlignTool from "./toolbar/AlignTool";
import UndoRedoTool from "./toolbar/UndoRedoTool";
import Skeleton from "../ui/skeleton";
import ListTool from "./toolbar/ListTool";
import OtherTool from "./toolbar/OtherTool";

export interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar: FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return <Skeleton className="h-[40px] w-[1141px]" />;
  }

  return (
    <div className="sticky top-16 flex h-10 items-center gap-2 rounded-md border border-input bg-background p-2">
      <MarkToolbar editor={editor} />
      <Separator orientation="vertical" />
      <HeadingToolbar editor={editor} />
      <Separator orientation="vertical" />
      <OtherTool editor={editor} />
      <Separator orientation="vertical" />
      <AlignTool editor={editor} />
      <Separator orientation="vertical" />
      <ListTool editor={editor} />
      <Separator orientation="vertical" />
      <UndoRedoTool editor={editor} />
    </div>
  );
};

export default Toolbar;
