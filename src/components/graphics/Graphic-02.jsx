"use client";
import { motion } from "framer-motion";

const Graphic02 = () => {
  const pathVariants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <motion.svg
      width="15.875mm"
      height="21.918mm"
      initial="hidden"
      animate="visible"
      viewBox="0 0 15.875 21.918"
    >
      <motion.g
        transform="translate(-45.586 -71.48)"
        variants={pathVariants}
        animate="visible"
        initial="hidden"
        exit="hidden"
      >
        <motion.g
          transform="matrix(.7521 0 0 .7521 33.304 21.212)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          variants={pathVariants}
          animate="visible"
          initial="hidden"
          exit="hidden"
        >
          <motion.path
            transform="matrix(.32078 0 0 .32078 -43.306 -6.4143)"
            d="m243.78 264.5-55.932 31.188 0.47826-32.016 0.47825-32.016 27.488 16.422z"
            strokeWidth="3.7795"
            variants={pathVariants}
            animate="visible"
            initial="hidden"
            exit="hidden"
          />
          <motion.path
            transform="matrix(.32078 0 0 .32078 -41.262 .69988)"
            d="m243.78 264.5-55.932 31.188 0.47826-32.016 0.47825-32.016 27.488 16.422z"
            strokeWidth="1.5587"
            variants={pathVariants}
            animate="visible"
            initial="hidden"
            exit="hidden"
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
};

export default Graphic02;
