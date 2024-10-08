import { motion } from "framer-motion";
import { useState, forwardRef } from "react";
import "../buttons/defaultButton.css";

const DefaultButton = forwardRef(
  ({ children, onClick, className, animated = true }, ref) => {
    const [ripples, setRipples] = useState([]);

    const createRipple = (event) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newRipple = {
        x,
        y,
        key: Date.now(),
      };

      setRipples((prevRipples) => [...prevRipples, newRipple]);

      setTimeout(() => {
        setRipples((prevRipples) =>
          prevRipples.filter((ripple) => ripple.key !== newRipple.key)
        );
      }, 600);
    };

    const handleClick = (event) => {
      createRipple(event);
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <motion.button
        whileHover={animated ? { scale: 1.08 } : undefined}
        whileTap={animated ? { scale: 1 } : undefined}
        transition={
          animated ? { type: "spring", stiffness: 400, damping: 17 } : undefined
        }
        className={`default-button ${className}`}
        onClick={handleClick}
        ref={ref}
      >
        {children}
        {ripples.map((ripple) => (
          <span
            key={ripple.key}
            className="ripple"
            style={{ left: ripple.x, top: ripple.y }}
          />
        ))}
      </motion.button>
    );
  }
);

export default DefaultButton;
