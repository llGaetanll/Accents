/** @jsxImportSource @emotion/react */
// custom pragma necessary on CRA
// see: https://github.com/emotion-js/emotion/issues/2752
import { AnimatePresence, motion } from "framer-motion";

import Accents from "./accents/Accents";

/* styling constants */
import {
  MARGIN,
  BACKGROUND_COLOR,
  POINTER_SIZE,
  GAP_SIZE,
  KEY_WIDTH,
  KEY_HEIGHT,
  BORDER_RADIUS,
  OPACITY,
} from "../util/const";

// define some styles for pointers
const triangle = {
  position: "absolute",
  boxSizing: "border-box",

  width: POINTER_SIZE,
  height: POINTER_SIZE,
};

const up = (color, x) => ({
  top: -POINTER_SIZE,
  left: x,

  borderBottom: `${POINTER_SIZE}px solid ${color}`,
  borderLeft: `${POINTER_SIZE}px solid transparent`,
  borderRight: `${POINTER_SIZE}px solid transparent`,
});

const down = (color, x) => ({
  bottom: -POINTER_SIZE,
  left: x,

  borderTop: `${POINTER_SIZE}px solid ${color}`,
  borderLeft: `${POINTER_SIZE}px solid transparent`,
  borderRight: `${POINTER_SIZE}px solid transparent`,
});

const left = (color, y) => ({
  left: -POINTER_SIZE,
  top: y,

  borderRight: `${POINTER_SIZE}px solid ${color}`,
  borderTop: `${POINTER_SIZE}px solid transparent`,
  borderBottom: `${POINTER_SIZE}px solid transparent`,
});

const right = (color, y) => ({
  right: -POINTER_SIZE,
  top: y,

  borderLeft: `${POINTER_SIZE}px solid ${color}`,
  borderTop: `${POINTER_SIZE}px solid transparent`,
  borderBottom: `${POINTER_SIZE}px solid transparent`,
});

const Modal = ({ show }) => {
  const { display, key, pos } = show;

  const getRelativePos = () => {
    const y = pos.y - (KEY_HEIGHT + 2 * GAP_SIZE + 2 * MARGIN);
    const x = pos.x - (MARGIN + GAP_SIZE + KEY_WIDTH / 2);

    return {
      top: y,
      left: x,
    };
  };

  return (
    <AnimatePresence>
      {display && (
        <div
          css={[
            { position: "fixed" },
            pos ? getRelativePos() : { top: 0, left: 0 },
          ]}
        >
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 5, opacity: 0 }}
          >
            <div
              css={{
                display: "inline-flex",

                margin: MARGIN,
                borderRadius: BORDER_RADIUS,

                position: "relative",
              }}
            >
              <Accents keyPressed={key} targetEl={show.targetEl} />
              <div
                css={{
                  position: "absolute",
                  borderRadius: "inherit",

                  width: "100%",
                  height: "100%",

                  opacity: OPACITY,
                  background: BACKGROUND_COLOR,
                  // backdropFilter: "blur(20px)", // tricky in FF still
                }}
              >
                <div
                  css={[
                    triangle,
                    down(
                      BACKGROUND_COLOR,
                      GAP_SIZE + KEY_WIDTH / 2 - POINTER_SIZE
                    ),
                  ]}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
