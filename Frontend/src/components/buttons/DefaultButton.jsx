import { motion } from "framer-motion";

export default function DefaultButton({ children, onClick, className }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`default-button ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
