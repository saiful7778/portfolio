"use client";
import { FC, KeyboardEvent, useRef, useState } from "react";
import Input from "./ui/input";
import { X } from "lucide-react";
import Label from "./ui/label";

interface TagInputProps {
  // eslint-disable-next-line no-unused-vars
  setValue: (value: string[]) => void;
}

const TagInput: FC<TagInputProps> = ({ setValue }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputRef.current) {
        const tag = inputRef.current.value;
        setTags((prevs) => {
          setValue([...prevs, tag]);
          return [...prevs, tag];
        });
        inputRef.current.value = "";
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags((prevs) => {
      const remain = prevs?.filter((prev) => prev !== tag);
      setValue(remain);
      return remain;
    });
  };

  return (
    <>
      {tags.length > 0 && (
        <div className="flex gap-2 rounded-md border p-2">
          {tags.map((tag, idx) => (
            <div
              key={`tag-${idx}`}
              className="flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs text-primary-foreground"
            >
              <span className="font-medium">{tag}</span>
              <button onClick={() => removeTag(tag)} type="button">
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
      <fieldset>
        <Label id="tags">
          Tags <span className="text-destructive">*</span>
        </Label>
        <Input
          ref={inputRef}
          id="tags"
          className="mt-1"
          onKeyDown={addTag}
          placeholder="Project tags"
          minLength={1}
          maxLength={10}
        />
      </fieldset>
    </>
  );
};

export default TagInput;
