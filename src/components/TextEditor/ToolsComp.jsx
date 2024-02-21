import Tool from "./Tool";
import {
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from "react-icons/lu";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
} from "react-icons/ai";
import { FaParagraph } from "react-icons/fa";
import { FaListUl, FaListOl } from "react-icons/fa";
import { FaBold, FaItalic, FaCode } from "react-icons/fa";

export const TextHtmlFormat = ({ editor }) => {
  const handleParagraph = () => {
    editor.chain().focus().setParagraph().run();
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
  return (
    <>
      <Tool
        tag="paragraph"
        isActive={editor.isActive("paragraph")}
        onClick={handleParagraph}
      >
        <FaParagraph />
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
    </>
  );
};

export const TextAlign = ({ editor }) => {
  const handleAlignLeft = () => {
    editor.chain().focus().setTextAlign("left").run();
  };
  const handleAlignCenter = () => {
    editor.chain().focus().setTextAlign("center").run();
  };
  const handleAlignRight = () => {
    editor.chain().focus().setTextAlign("right").run();
  };
  return (
    <>
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
    </>
  );
};

export const TextList = ({ editor }) => {
  const handleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const handleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };
  return (
    <>
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
    </>
  );
};

export const TextStyle = ({ editor }) => {
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

  return (
    <>
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
      <Tool tag="code" isActive={editor.isActive("code")} onClick={handleCode}>
        <FaCode />
      </Tool>
    </>
  );
};
