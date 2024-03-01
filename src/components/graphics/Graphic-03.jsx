"use client";
import { motion } from "framer-motion";

const Graphic03 = () => {
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
      height="18.696mm"
      initial="hidden"
      animate="visible"
      viewBox="0 0 15.875 18.696"
    >
      <motion.g
        transform="translate(-41.811 -64.904)"
        variants={pathVariants}
        animate="visible"
        initial="hidden"
        exit="hidden"
      >
        <motion.g
          transform="matrix(.88486 0 0 .88486 -39.958 -33.99)"
          fill="none"
          stroke="#fff"
          variants={pathVariants}
          animate="visible"
          initial="hidden"
          exit="hidden"
        >
          <motion.circle
            cx="99.494"
            cy="118.85"
            r="6.45"
            variants={pathVariants}
            animate="visible"
            initial="hidden"
            exit="hidden"
            strokeWidth="1.2687"
          />
          <motion.circle
            cx="103.27"
            cy="125.82"
            r="6.667"
            variants={pathVariants}
            animate="visible"
            initial="hidden"
            exit="hidden"
            strokeWidth=".82045"
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
};

export default Graphic03;
