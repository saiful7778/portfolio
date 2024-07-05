import { FC } from "react";
import { ToolbarProps } from "../Toolbar";
import { Heading2, Heading3, Heading4, Heading5, Heading6 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";

const HeadingToolbar: FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

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
    <ToggleGroup className="gap-2" type="single">
      <ToggleGroupItem value="heading-2" asChild>
        <Toggle
          size="sm"
          className="size-6 p-0"
          pressed={editor.isActive("heading-2")}
          onPressedChange={handleHeading2}
        >
          <Heading2 size={15} />
        </Toggle>
      </ToggleGroupItem>
      <ToggleGroupItem value="heading-3" asChild>
        <Toggle
          size="sm"
          className="size-6 p-0"
          pressed={editor.isActive("heading-3")}
          onPressedChange={handleHeading3}
        >
          <Heading3 size={15} />
        </Toggle>
      </ToggleGroupItem>
      <ToggleGroupItem value="heading-4" asChild>
        <Toggle
          size="sm"
          className="size-6 p-0"
          pressed={editor.isActive("heading-4")}
          onPressedChange={handleHeading4}
        >
          <Heading4 size={15} />
        </Toggle>
      </ToggleGroupItem>
      <ToggleGroupItem value="heading-5" asChild>
        <Toggle
          size="sm"
          className="size-6 p-0"
          pressed={editor.isActive("heading-5")}
          onPressedChange={handleHeading5}
        >
          <Heading5 size={15} />
        </Toggle>
      </ToggleGroupItem>
      <ToggleGroupItem value="heading-6" asChild>
        <Toggle
          size="sm"
          className="size-6 p-0"
          pressed={editor.isActive("heading-6")}
          onPressedChange={handleHeading6}
        >
          <Heading6 size={15} />
        </Toggle>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default HeadingToolbar;
