import { Toggle } from "@/components/ui/toggle";
import { Minus, TextQuote, WrapText } from "lucide-react";
import { FC } from "react";
import { ToolbarProps } from "../Toolbar";

const OtherTool: FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const handleBlockquote = () => {
    editor.chain().focus().toggleBlockquote().run();
  };

  const handleHardBreak = () => {
    editor.chain().focus().setHardBreak().run();
  };

  const handleHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run();
  };

  return (
    <>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={editor.isActive("blockquote")}
        onPressedChange={handleBlockquote}
      >
        <TextQuote size={15} />
      </Toggle>
      <Toggle
        size="sm"
        className="size-6 p-0"
        onPressedChange={handleHardBreak}
      >
        <WrapText size={15} />
      </Toggle>
      <Toggle
        size="sm"
        className="size-6 p-0"
        onPressedChange={handleHorizontalRule}
      >
        <Minus size={15} />
      </Toggle>
    </>
  );
};

export default OtherTool;
