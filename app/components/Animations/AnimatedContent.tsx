"use client";
import { motion } from "motion/react";
function AnimatedContent({ children, className = ""  }: { children: React.ReactNode, className?: string }) {
  return (
   
      <motion.div
        className={className}
        initial={{
          opacity: 0,
          y: 50,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -50,
        }}
      >
        {children}
      </motion.div>
     
  );
}
export default AnimatedContent;
