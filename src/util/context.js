import { createContext, useReducer } from "react";

import { getCaret } from "./caret";

const defState = {
  display: false,
  key: null,
  targetEl: null,
  pos: null,
};

const POINTER_ID = "accents-caret-ptr";

// to see the caret elements
const DEBUG = false;

const modalActions = (dispatch) => ({
  show: (payload) => {
    const { targetEl } = payload;

    // get caret position from field
    const [x, y] = getCaret(targetEl, DEBUG);

    // since the position of the anchor is computed from the end of the letter,
    // this number is an estimate for half of the length of a character
    const OFFSET = 4;

    // create an element that we can give as an anchor to react popper
    const caretPtr = document.createElement("span");
    caretPtr.id = POINTER_ID;
    caretPtr.style.position = "fixed";
    caretPtr.style.top = y + "px";
    caretPtr.style.left = x - OFFSET + "px";

    if (DEBUG) {
      caretPtr.style.width = 1;
      caretPtr.style.height = 10;
      caretPtr.style.background = "red";
    }

    // add element as sibbling
    targetEl.parentNode.insertBefore(caretPtr, targetEl.nextSibling);

    dispatch({ type: "SHOW", payload: { ...payload, caretPtr } });
  },
  hide: () => {
    // remove the anchor
    document.getElementById(POINTER_ID).remove();

    dispatch({ type: "HIDE" });
  },
});

// Where the feedback state is updated based on which actions
// are performed
const modalReducer = (state, { type, payload }) => {
  switch (type) {
    case "SHOW": {
      return { ...state, ...payload };
    }
    case "HIDE": {
      return { ...state, display: false };
    }
    default: {
      return state;
    }
  }
};

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, dispatch] = useReducer(modalReducer, defState);

  const actions = modalActions(dispatch);

  return (
    <ModalContext.Provider value={{ ...modalState, ...actions }}>
      {children}
    </ModalContext.Provider>
  );
};
