/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { motion } from "framer-motion";

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

        width: 50,
        height: 65,

        cursor: "pointer",
        border: 0,
        padding: 0,
        borderRadius: 10,
        background: "white",
      }}
    >
      <h1 css={[textItem, { flex: 4 }]}>{accent}</h1>
      <h2 css={[textItem, { flex: 3, color: "#494f5a" }]}>{shortcut}</h2>
    </motion.button>
  );
};

const fakedata = [
  ["á", 1],
  ["à", 2],
  ["â", 3],
  ["ä", 4],
  ["æ", 5],
  ["å", 6],
  ["ã", 7],
  ["ā", 8],
];

const Accents = () => {
  return (
    <div
      css={{
        display: "inline-flex",
        gap: 9,
        padding: 9,
        zIndex: 1,
      }}
    >
      {fakedata.map((datum, i) => (
        <Button key={`button-${i}`} accent={datum[0]} shortcut={datum[1]} />
      ))}
    </div>
  );
};

export default Accents;
