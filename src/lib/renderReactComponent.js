import Image from "next/image";
import Link from "next/link";

function renderContent(inputContent) {
  if (inputContent) {
    return inputContent.map((ele, idx) => {
      if (ele.type === "text") {
        if (ele.marks) {
          return ele.marks.map((mark) =>
            inlineTag(
              mark.type,
              { ...mark.attrs, text: ele.text },
              `${ele.type}-${idx}`,
            ),
          );
        }
        return ele.text;
      } else if (ele.type === "listItem") {
        return ele.content.map((list, idx) => (
          <li key={`${ele.type}-${idx}`}>
            {renderTag(list, `${list.type}-${idx}`)}
          </li>
        ));
      } else if (ele.type === "hardBreak") {
        return <br key={`${ele.type}-${idx}`} />;
      } else {
        return renderTag(ele, `${ele.type}-${idx}`);
      }
    });
  } else {
    return null;
  }
}

function inlineTag(type, inputData, key) {
  switch (type) {
    case "link":
      return (
        <Link
          key={key}
          href={inputData.href}
          rel={inputData.rel}
          className={inputData.class}
          target={inputData.target}
        >
          {inputData.text}
        </Link>
      );
    case "bold":
      return <strong key={key}>{inputData.text}</strong>;
    case "code":
      return <code key={key}>{inputData.text}</code>;
    case "italic":
      return <em key={key}>{inputData.text}</em>;
    case "highlight":
      return (
        <mark className="mx-0.5 rounded-sm bg-yellow-300 px-0.5" key={key}>
          {inputData.text}
        </mark>
      );
  }
}

function renderAttrs(inputAttrs) {
  if (inputAttrs.textAlign) {
    return { style: { textAlign: inputAttrs.textAlign } };
  } else if (inputAttrs.language) {
    return { className: `language-${inputAttrs.language}` };
  }
}

function renderTag(node, key) {
  switch (node.type) {
    case "doc":
      return (
        <div className="space-y-4" key={key}>
          {renderContent(node.content)}
        </div>
      );
    case "paragraph":
      return (
        <p key={key} {...renderAttrs(node.attrs)}>
          {renderContent(node.content)}
        </p>
      );
    case "heading":
      switch (node.attrs.level) {
        case 2:
          return (
            <h2
              key={key}
              className="text-3xl font-bold"
              {...renderAttrs(node.attrs)}
            >
              {renderContent(node.content)}
            </h2>
          );
        case 3:
          return (
            <h3
              key={key}
              className="text-2xl font-bold"
              {...renderAttrs(node.attrs)}
            >
              {renderContent(node.content)}
            </h3>
          );
        case 4:
          return (
            <h4
              key={key}
              className="text-xl font-bold"
              {...renderAttrs(node.attrs)}
            >
              {renderContent(node.content)}
            </h4>
          );
        case 5:
          return (
            <h5
              key={key}
              className="text-lg font-bold"
              {...renderAttrs(node.attrs)}
            >
              {renderContent(node.content)}
            </h5>
          );
        case 6:
          return (
            <h6
              key={key}
              className="text-base font-bold"
              {...renderAttrs(node.attrs)}
            >
              {renderContent(node.content)}
            </h6>
          );
      }
      break;
    case "orderedList":
      return (
        <ol
          key={key}
          className="ml-5 list-decimal"
          {...renderAttrs(node.attrs)}
        >
          {renderContent(node.content)}
        </ol>
      );
    case "bulletList":
      return (
        <ul key={key} className="ml-5 list-disc">
          {renderContent(node.content)}
        </ul>
      );
    case "codeBlock":
      return (
        <pre key={key}>
          <code {...renderAttrs(node.attrs)}>
            {renderContent(node.content)}
          </code>
        </pre>
      );
    case "image":
      return (
        <Image
          key={key}
          width={parseInt(
            node.attrs.style
              .replace("width: ", "")
              .replace("px; height:", "")
              .replace("px; cursor: pointer;", "")
              .split(" ")[0],
          )}
          height={parseInt(
            node.attrs.style
              .replace("width: ", "")
              .replace("px; height:", "")
              .replace("px; cursor: pointer;", "")
              .split(" ")[1],
          )}
          src={node.attrs.src}
          alt={node.attrs.alt}
          title={node.attrs.title}
        />
      );
  }
}

export default function renderReactComponent(data) {
  return renderTag(data, "description");
}
