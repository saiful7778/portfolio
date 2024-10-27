"use client";
import { motion, type Variants } from "framer-motion";

const Graphic04: React.FC = () => {
  const pathVariants: Variants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };
  return (
    <motion.svg
      width="15.875mm"
      height="5.0418mm"
      initial="hidden"
      animate="visible"
      viewBox="0 0 15.875 5.0418"
    >
      <motion.g
        transform="translate(-7.2732 -105.12)"
        variants={pathVariants}
        animate="visible"
        initial="hidden"
        exit="hidden"
      >
        <motion.path
          d="m7.5822 105.41 3.6744 3.8866 2.4284-2.7966 2.7925 2.8317 3.0581-2.7935 3.3116 3.3213"
          fill="none"
          stroke="#fff"
          strokeWidth=".85033"
          variants={pathVariants}
          animate="visible"
          initial="hidden"
          exit="hidden"
        />
      </motion.g>
    </motion.svg>
  );
};

export default Graphic04;
