"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import { FC, memo, useCallback, useState } from "react";
import { ToolbarProps } from "../Toolbar";
import { Link } from "lucide-react";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

interface LinkToolProps extends ToolbarProps {
  pressed: boolean;
}

const linkValidatorRegex =
  "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";

const LinkTool: FC<LinkToolProps> = ({ editor, pressed }) => {
  const [linkInput, setLinkInput] = useState<string>("");
  const [linkDialog, setLinkDialog] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<string>("");

  const handleLink = useCallback(() => {
    if (editor) {
      setLinkDialog(true);
      const previousUrl = editor.getAttributes("link").href;
      if (previousUrl) {
        setLinkInput(previousUrl);
      }
    }
  }, [editor]);

  const handleUnsetLink = useCallback(() => {
    if (editor) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setLinkDialog(false);
    }
  }, [editor]);

  const handleSetLink = useCallback(async () => {
    if (editor) {
      setErrorStatus("");

      const isValidUrl = new RegExp(linkValidatorRegex, "i");

      if (!isValidUrl.test(linkInput)) {
        setErrorStatus("Please enter a valid link");
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkInput })
        .run();
      setLinkDialog(false);
    }
  }, [editor, linkInput]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <Toggle
        size="sm"
        className="size-6 p-0"
        pressed={pressed}
        onPressedChange={handleLink}
      >
        <Link size={15} />
      </Toggle>
      <Dialog open={linkDialog} onOpenChange={setLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write link here</DialogTitle>
          </DialogHeader>
          <fieldset>
            <Label>Enter url</Label>
            <Input
              className="mt-1"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              type="url"
              placeholder="Url address"
            />
          </fieldset>
          {errorStatus && (
            <div className="text-sm font-medium text-destructive">
              {errorStatus}
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={handleUnsetLink}
              variant="destructive"
              type="button"
            >
              Remove
            </Button>
            <Button onClick={handleSetLink} type="button">
              Add link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(LinkTool);
