import { createContext, useReducer } from "react";

const defState = {
  display: false,
  key: null,
  targetEl: null,
  pos: null,
};

const modalActions = (dispatch) => ({
  show: (payload) => {
    dispatch({ type: "SHOW", payload });
  },
  hide: () => {
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
