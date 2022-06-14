/** @jsxImportSource @emotion/react */
// custom pragma necessary on CRA
// see: https://github.com/emotion-js/emotion/issues/2752
import { useContext, useState } from "react";
import { usePopper } from "react-popper";
import { AnimatePresence, motion } from "framer-motion";
import { GlobalHotKeys } from "react-hotkeys";
import { ModalContext } from "../util/context";

import KeyListener from "./accents/KeyListener";
import Accents from "./accents/Accents";

import { keyMap, handlers } from "../util/hotkeys";

/* styling constants */
import {
  MARGIN,
  BACKGROUND_COLOR,
  POINTER_SIZE,
  BORDER_RADIUS,
  OPACITY,
} from "../util/const";

const Modal = () => {
  const { display, hide, caretPtr } = useContext(ModalContext);

  const handleClose = () => hide();

  const [popperEl, setPopperElement] = useState(null);
  const [arrowEl, setArrowElement] = useState(null);

  const { styles, attributes } = usePopper(caretPtr, popperEl, {
    placement: "top",
    modifiers: [{ name: "arrow", options: { element: arrowEl } }],
  });

  const placement = attributes?.popper?.["data-popper-placement"];

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <KeyListener>
        <AnimatePresence>
          {display && (
            <>
              <div
                ref={setPopperElement}
                {...attributes.popper}
                style={styles.popper}
                css={[styles.popper, { zIndex: 11 }]}
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
                    <Accents />
                    <div
                      ref={setArrowElement}
                      css={[
                        {
                          opacity: OPACITY,
                          // width: 5,
                          // height: 5,
                          // transform: "rotate(45deg)",
                          // background: "green",
                        },
                        placement === "top" && {
                          bottom: -POINTER_SIZE,

                          borderTop: `${POINTER_SIZE}px solid ${BACKGROUND_COLOR}`,
                          borderLeft: `${POINTER_SIZE}px solid transparent`,
                          borderRight: `${POINTER_SIZE}px solid transparent`,
                        },
                        placement === "bottom" && {
                          top: -POINTER_SIZE,

                          borderBottom: `${POINTER_SIZE}px solid ${BACKGROUND_COLOR}`,
                          borderLeft: `${POINTER_SIZE}px solid transparent`,
                          borderRight: `${POINTER_SIZE}px solid transparent`,
                        },
                        placement === "left" && {
                          right: -POINTER_SIZE,

                          borderLeft: `${POINTER_SIZE}px solid ${BACKGROUND_COLOR}`,
                          borderTop: `${POINTER_SIZE}px solid transparent`,
                          borderBottom: `${POINTER_SIZE}px solid transparent`,
                        },
                        placement === "right" && {
                          left: -POINTER_SIZE,

                          borderRight: `${POINTER_SIZE}px solid ${BACKGROUND_COLOR}`,
                          borderTop: `${POINTER_SIZE}px solid transparent`,
                          borderBottom: `${POINTER_SIZE}px solid transparent`,
                        },
                        styles.arrow,
                      ]}
                    />
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
                    />
                  </div>
                </motion.div>
              </div>

              <div
                onClick={handleClose}
                css={{
                  position: "fixed",
                  width: "100vw",
                  height: "100vh",
                  zIndex: 10,
                }}
              />
            </>
          )}
        </AnimatePresence>
      </KeyListener>
    </GlobalHotKeys>
  );
};

export default Modal;
