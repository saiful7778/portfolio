"use client";
import { Variants, motion } from "framer-motion";
import { FC, useEffect, useMemo, useState } from "react";

const TypingAnimation: FC = () => {
  const [text, setText] = useState<{ id: string; text: string[] }>({
    id: "",
    text: [""],
  });

  const data = useMemo(() => {
    return [
      {
        id: "txt-1",
        text: "HTML5",
      },
      {
        id: "txt-2",
        text: "CSS3",
      },
      {
        id: "txt-3",
        text: "JavaScript",
      },
      {
        id: "txt-4",
        text: "Nextjs",
      },
      {
        id: "txt-5",
        text: "React",
      },
      {
        id: "txt-6",
        text: "Firebase",
      },
      {
        id: "txt-7",
        text: "Node",
      },
      {
        id: "txt-8",
        text: "Express",
      },
      {
        id: "txt-9",
        text: "MongoDB",
      },
    ];
  }, []);

  useEffect(() => {
    let idx = 0;
    let timeoutId: NodeJS.Timeout;

    const updateText = () => {
      setText({ id: data[idx].id, text: data[idx].text.split("") });
      timeoutId = setTimeout(() => {
        idx = (idx + 1) % data.length;
        updateText();
      }, data[idx].text.length * 500);
    };

    updateText();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [data]);

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: [1, 1.5, 0.8, 1],
      rotate: [10, -10, 0],
    },
  };

  return (
    <div>
      <span className="sr-only">{text.text.join("")}</span>
      <motion.span
        initial="hidden"
        animate="visible"
        className="text-primary"
        aria-hidden
      >
        {text.text.map((char, idx) => (
          <motion.span
            className="inline-block"
            variants={childVariants}
            transition={{ ease: "easeInOut", delay: idx * 0.1 }}
            key={`ani-text-${text.id}-${idx}`}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
};

export default TypingAnimation;
