import { FC } from "react";
import { ToolbarProps } from "../Toolbar";
import { Toggle } from "@/components/ui/toggle";
import { Undo, Redo } from "lucide-react";

const UndoRedoTool: FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const handleUndo = () => {
    editor.chain().focus().undo().run();
  };

  const handleRedo = () => {
    editor.chain().focus().redo().run();
  };

  return (
    <>
      <Toggle
        size="sm"
        className="size-6 p-0"
        disabled={!editor.can().chain().focus().undo().run()}
        onPressedChange={handleUndo}
      >
        <Undo size={15} />
      </Toggle>
      <Toggle
        size="sm"
        className="size-6 p-0"
        disabled={!editor.can().chain().focus().redo().run()}
        onPressedChange={handleRedo}
      >
        <Redo size={15} />
      </Toggle>
    </>
  );
};

export default UndoRedoTool;
