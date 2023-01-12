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

// arrow styles depending on orientation, handled by react popper
const ARROW_STYLES = {
  top: {
    bottom: -POINTER_SIZE,
  },
  bottom: {
    top: -POINTER_SIZE,

    transform: "rotate(180deg)",
  },
  left: {
    right: -POINTER_SIZE,

    transform: "rotate(90deg)",
  },
  right: {
    left: -POINTER_SIZE,

    transform: "rotate(-90deg)",
  },
};

// our elements need to be above any other elements on the page.  there is no
// set limit defined on the CSS <integer> type, but this should be some really
// large number.
const MODAL_Z_INDEX = 1_000_000;
const BACKDROP_Z_INDEX = MODAL_Z_INDEX - 1;

const Modal = () => {
  const { display, hide, caretPtr } = useContext(ModalContext);

  const handleClose = () => hide();

  const [popperEl, setPopperElement] = useState(null);
  const [arrowEl, setArrowElement] = useState(null);

  const { styles, attributes } = usePopper(caretPtr, popperEl, {
    placement: "top",
    modifiers: [
      {
        name: "arrow",
        options: {
          element: arrowEl,
          padding: BORDER_RADIUS,
        },
      },
    ],
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
                css={[
                  styles.popper,
                  {
                    zIndex: MODAL_Z_INDEX,
                  },
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
                    <Accents />
                    <div
                      ref={setArrowElement}
                      css={[
                        styles.arrow,
                        {
                          opacity: OPACITY,

                          borderTop: `${POINTER_SIZE}px solid ${BACKGROUND_COLOR}`,
                          borderLeft: `${POINTER_SIZE}px solid transparent`,
                          borderRight: `${POINTER_SIZE}px solid transparent`,
                        },
                        ARROW_STYLES[placement],
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
                  zIndex: BACKDROP_Z_INDEX,
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
