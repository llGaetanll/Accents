/** @jsxImportSource @emotion/react */
// custom pragma necessary on CRA
// see: https://github.com/emotion-js/emotion/issues/2752
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Accents from "./accents";

const Popup = ({ show }) => {
  const { display, key } = show;
  return (
    <AnimatePresence>
      {display && (
        <div css={{ position: "fixed", top: 0, right: 0 }}>
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 5, opacity: 0 }}
          >
            <div
              css={{
                display: "inline-flex",

                margin: 10,
                borderRadius: 12,

                position: "relative",
                overflow: "hidden",
              }}
            >
              <Accents keyPressed={key} />
              <div
                css={{
                  position: "absolute",

                  width: "100%",
                  height: "100%",

                  opacity: 0.6,
                  background: "#b7c6e3",
                  // backdropFilter: "blur(20px)", // tricky in FF still
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const MagicComponent = () => {
  const [hidden, setHidden] = useState(false);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.button
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setHidden(true)}
        >
          Click to hide
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Popup;
