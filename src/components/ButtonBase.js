/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";

import { KEY_WIDTH, KEY_HEIGHT } from "../util/const";

/* This button base is shared by Accents and Emoji and acts as a virtual keyboard key */
const ButtonBase = ({ children, ...props }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      css={{
        display: "flex",
        flexDirection: "column",

        width: KEY_WIDTH,
        height: KEY_HEIGHT,

        cursor: "pointer",
        border: 0,
        padding: 0,
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
