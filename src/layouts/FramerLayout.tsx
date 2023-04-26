import { motion } from "framer-motion";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const FramerLayout: React.FC<Props> = ({ children }) => {
  return (
    <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
};

export default FramerLayout;
