"use client";
import { motion, AnimatePresence } from "framer-motion";

const Reval = ({ children }) => {
  return (
    <AnimatePresence mode="sync">
      <div className="relative overflow-hidden">
        <motion.div
          className="absolute bottom-1 left-0 right-0 top-1 z-20 bg-accent-color"
          initial={{ left: 0 }}
          whileInView={{ left: "100%" }}
          viewport={{ once: true, margin: "50% 0px -20% 0px" }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50% 0px -20% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Reval;
