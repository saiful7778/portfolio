import { FaLaptopCode } from "react-icons/fa";
import { IoMdUndo, IoMdRedo } from "react-icons/io";
import { FaLink, FaLinkSlash } from "react-icons/fa6";
import { useCallback } from "react";
// others
import Alert from "@/lib/config/Alert.config";
import Button from "../utilities/Button";
import Tool from "./Tool";
import { TextAlign, TextHtmlFormat, TextList, TextStyle } from "./ToolsComp";
import ImageUploadTool from "./ImageUploadTool";

const TextEditorToolbar = ({ editor }) => {
  const handleSetLink = useCallback(async () => {
    const previousUrl = editor.getAttributes("link").href;
    const { value: url } = await Alert.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL",
      inputValue: previousUrl,
    });
    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const handleCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };
  const handleUnsetLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const handleUndo = () => {
    editor.chain().focus().undo().run();
  };
  const handleRedo = () => {
    editor.chain().focus().redo().run();
  };

  return (
    <div className="mb-2 flex w-full flex-wrap gap-2 rounded border border-gray-600 p-2">
      <TextStyle editor={editor} />
      <div className="w-[1px] bg-gray-600"></div>
      <TextAlign editor={editor} />
      <TextList editor={editor} />
      <div className="w-[1px] bg-gray-600"></div>
      <Tool
        tag="code block"
        isActive={editor.isActive("codeBlock")}
        onClick={handleCodeBlock}
      >
        <FaLaptopCode />
      </Tool>
      <Tool
        tag="set link"
        isActive={editor.isActive("link")}
        onClick={handleSetLink}
      >
        <FaLink />
      </Tool>
      <Tool
        tag="unset link"
        isActive={editor.isActive("link")}
        onClick={handleUnsetLink}
        disabled={!editor.isActive("link")}
      >
        <FaLinkSlash />
      </Tool>
      <div className="w-[1px] bg-gray-600"></div>
      <TextHtmlFormat editor={editor} />
      <div className="w-[1px] bg-gray-600"></div>
      <Tool
        tag="undo"
        onClick={handleUndo}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <IoMdUndo />
      </Tool>
      <Tool
        tag="redo"
        onClick={handleRedo}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <IoMdRedo />
      </Tool>
      <div className="w-[1px] bg-gray-600"></div>
      <ImageUploadTool editor={editor} />
      <Button
        onClick={() => editor.commands.clearContent()}
        size="sm"
        variant="cancel"
      >
        Clear
      </Button>
    </div>
  );
};

export default TextEditorToolbar;
