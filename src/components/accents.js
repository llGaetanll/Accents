/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";

import { ACCENTS } from "../util/data";

const textItem = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  margin: 0,

  fontFamily: "Inter, sans-serif",
};

const Button = ({ accent, shortcut }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      css={{
        display: "flex",
        flexDirection: "column",

        width: 37,
        height: 48,

        cursor: "pointer",
        border: 0,
        padding: 0,
        borderRadius: 7,
        background: "white",
      }}
    >
      <h1 css={[textItem, { flex: 4, fontSize: "1.5em" }]}>{accent}</h1>
      <h2 css={[textItem, { flex: 3, color: "#494f5a", fontSize: "1.1em" }]}>
        {shortcut}
      </h2>
    </motion.button>
  );
};

const Accents = ({ keyPressed }) => {
  return (
    <div
      css={{
        display: "inline-flex",
        gap: 7,
        padding: 7,
        zIndex: 1,
      }}
    >
      {ACCENTS[keyPressed].map((accent, i) => (
        <Button key={`accent-button-${i}`} accent={accent} shortcut={i + 1} />
      ))}
    </div>
  );
};

export default Accents;
