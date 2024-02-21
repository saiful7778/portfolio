import { BubbleMenu } from "@tiptap/react";
import { TextStyle } from "./ToolsComp";

const FloatingMenu = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <BubbleMenu
      className="flex items-center gap-1 border border-gray-700 bg-gray-800 p-1"
      tippyOptions={{ duration: 100 }}
      editor={editor}
    >
      <TextStyle editor={editor} />
    </BubbleMenu>
  );
};

export default FloatingMenu;
