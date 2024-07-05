"use client";
import { FC, useState } from "react";
import { Code } from "lucide-react";
import { BsMarkdown } from "react-icons/bs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Textarea from "../ui/textarea";
// markdown
import ReactMarkdown from "react-markdown";
// remark
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import remarkImages from "remark-images";
// rehype
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// syntax highlight
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Editor: FC = () => {
  const [content, setContent] = useState<string>("");

  return (
    <div>
      <Tabs defaultValue="markdown">
        <div className="flex justify-end text-xs">
          <TabsList className="h-8 p-1">
            <TabsTrigger className="size-6 p-0" value="markdown">
              <BsMarkdown size={16} strokeWidth={0.1} />
            </TabsTrigger>
            <TabsTrigger className="size-6 p-0" value="preview">
              <Code size={16} strokeWidth={1} />
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="h-[500px]">
          <TabsContent className="h-full overflow-auto" value="markdown">
            <Textarea
              placeholder="Project description markdown"
              className="h-full resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              minLength={1}
              maxLength={5000}
            />
          </TabsContent>
          <TabsContent
            className="h-full rounded-md border px-3 py-2"
            value="preview"
          >
            <div className="h-full overflow-auto">
              <ReactMarkdown
                remarkPlugins={[
                  remarkParse,
                  remarkStringify,
                  remarkHtml,
                  remarkRehype,
                  remarkGfm,
                  remarkImages,
                ]}
                rehypePlugins={[
                  rehypeSanitize,
                  rehypeSlug,
                  [rehypeAutolinkHeadings],
                ]}
                components={{
                  code({ inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");

                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={coldarkDark}
                        PreTag="div"
                        language={match[1]}
                        {...props}
                      >
                        {String(children)}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Editor;
