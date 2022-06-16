/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";

/* This button base is shared by Accents and Emoji and acts as a virtual keyboard key */
const ButtonBase = ({ children, ...props }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      css={{
        display: "flex",
        flexDirection: "column",

        minWidth: 56,
        minHeight: 32,

        cursor: "pointer",
        border: 0,
        margin: 4,
        padding: 8,
        borderRadius: 7,
        background: "white",
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default ButtonBase;
