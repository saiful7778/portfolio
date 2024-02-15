import cn from "@/lib/cn";
// icons
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from "react-icons/lu";
import {
  FaBold,
  FaItalic,
  FaParagraph,
  FaCode,
  FaListUl,
  FaListOl,
  FaLaptopCode,
} from "react-icons/fa";
import { IoMdUndo, IoMdRedo } from "react-icons/io";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
} from "react-icons/ai";
import { FaLink, FaLinkSlash } from "react-icons/fa6";
import { useCallback } from "react";
// others
import Alert from "@/lib/config/Alert.config";
import Button from "../utilities/Button";

const style = {
  base: "cursor-pointer rounded w-7 h-7 inline-flex items-center justify-center font-semibold shadow border border-gray-50 duration-200 active:focus:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
  inActive: "hover:bg-gray-50 hover:text-accent-color",
  isActive: "bg-gray-50 text-accent-color",
};

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

  const handleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };
  const handleMark = () => {
    editor.chain().focus().toggleHighlight().run();
  };

  const handleCode = () => {
    editor.chain().focus().toggleCode().run();
  };

  const handleParagraph = () => {
    editor.chain().focus().setParagraph().run();
  };

  const handleAlignLeft = () => {
    editor.chain().focus().setTextAlign("left").run();
  };
  const handleAlignCenter = () => {
    editor.chain().focus().setTextAlign("center").run();
  };
  const handleAlignRight = () => {
    editor.chain().focus().setTextAlign("right").run();
  };

  const handleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const handleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  const handleCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };
  const handleUnsetLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const handleHeading1 = () => {
    editor.chain().focus().toggleHeading({ level: 1 }).run();
  };
  const handleHeading2 = () => {
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  };
  const handleHeading3 = () => {
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  };
  const handleHeading4 = () => {
    editor.chain().focus().toggleHeading({ level: 4 }).run();
  };
  const handleHeading5 = () => {
    editor.chain().focus().toggleHeading({ level: 5 }).run();
  };
  const handleHeading6 = () => {
    editor.chain().focus().toggleHeading({ level: 6 }).run();
  };

  const handleUndo = () => {
    editor.chain().focus().undo().run();
  };
  const handleRedo = () => {
    editor.chain().focus().redo().run();
  };

  return (
    <div className="mb-2 flex w-full flex-wrap gap-2 rounded border border-gray-600 p-2">
      <Tool tag="bold" isActive={editor.isActive("bold")} onClick={handleBold}>
        <FaBold />
      </Tool>
      <Tool
        tag="italic"
        isActive={editor.isActive("italic")}
        onClick={handleItalic}
      >
        <FaItalic />
      </Tool>
      <Tool
        tag="highlight"
        isActive={editor.isActive("highlight")}
        onClick={handleMark}
      >
        M
      </Tool>
      <div className="w-[1px] bg-gray-600"></div>
      <Tool
        tag="align left"
        isActive={editor.isActive({ textAlign: "left" })}
        onClick={handleAlignLeft}
      >
        <AiOutlineAlignLeft />
      </Tool>
      <Tool
        tag="align center"
        isActive={editor.isActive({ textAlign: "center" })}
        onClick={handleAlignCenter}
      >
        <AiOutlineAlignCenter />
      </Tool>
      <Tool
        tag="align right"
        isActive={editor.isActive({ textAlign: "right" })}
        onClick={handleAlignRight}
      >
        <AiOutlineAlignRight />
      </Tool>
      <Tool
        tag="bullet list"
        isActive={editor.isActive("bulletList")}
        onClick={handleBulletList}
      >
        <FaListUl />
      </Tool>
      <Tool
        tag="ordered list"
        isActive={editor.isActive("orderedList")}
        onClick={handleOrderedList}
      >
        <FaListOl />
      </Tool>
      <div className="w-[1px] bg-gray-600"></div>
      <Tool tag="code" isActive={editor.isActive("code")} onClick={handleCode}>
        <FaCode />
      </Tool>
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
      <Tool
        tag="paragraph"
        isActive={editor.isActive("paragraph")}
        onClick={handleParagraph}
      >
        <FaParagraph />
      </Tool>
      <Tool
        tag="heading 1"
        isActive={editor.isActive("heading", { level: 1 })}
        onClick={handleHeading1}
      >
        <LuHeading1 />
      </Tool>
      <Tool
        tag="heading 2"
        isActive={editor.isActive("heading", { level: 2 })}
        onClick={handleHeading2}
      >
        <LuHeading2 />
      </Tool>
      <Tool
        tag="heading 3"
        isActive={editor.isActive("heading", { level: 3 })}
        onClick={handleHeading3}
      >
        <LuHeading3 />
      </Tool>
      <Tool
        tag="heading 4"
        isActive={editor.isActive("heading", { level: 4 })}
        onClick={handleHeading4}
      >
        <LuHeading4 />
      </Tool>
      <Tool
        tag="heading 5"
        isActive={editor.isActive("heading", { level: 5 })}
        onClick={handleHeading5}
      >
        <LuHeading5 />
      </Tool>
      <Tool
        tag="heading 6"
        isActive={editor.isActive("heading", { level: 6 })}
        onClick={handleHeading6}
      >
        <LuHeading6 />
      </Tool>
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

const Tool = ({ onClick, isActive, children, tag, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={cn(style.base, isActive ? style.isActive : style.inActive)}
      type="button"
      title={tag}
      {...props}
    >
      {children}
    </button>
  );
};

export default TextEditorToolbar;
