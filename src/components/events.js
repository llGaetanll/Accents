import { useEffect, useCallback } from "react";

import { useAsyncReducer } from "../util";
import { ACCENTS } from "../util/data";

const defState = {
  keyPresses: [],
};

const keybindReducer = (state, { type, event }) => {
  switch (type) {
    case "ADD_KEYPRESS": {
      const keyPress = event;

      return { ...state, keyPresses: [...state.keyPresses, keyPress] };
    }
    case "REM_KEYPRESS": {
      const key = event;

      return {
        ...state,
        keyPresses: state.keyPresses.filter((keyPress) => keyPress.key !== key),
      };
    }
    default:
      return state;
  }
};

const EventListener = ({ children }) => {
  const [keybindState, dispatchKeybind] = useAsyncReducer(
    keybindReducer,
    defState
  );

  const { keyPresses } = keybindState;

  // useCallback to prevent unecessary useEffect calls
  // handleDetectKeyUp is called whenever a keyUp is detected
  const handleAddKeyUp = useCallback(
    ({ key, timeStamp }) => {
      dispatchKeybind([
        keyUpHandler({ key, timeStamp }),
        { type: "REM_KEYPRESS", event: key },
      ]); // handle keyPress and remove key
    },
    [dispatchKeybind]
  );

  // called whenever a keyDown is detected
  // it calls keyDownHandler which handles any further logic
  const handleAddKeyDown = useCallback(
    (event) => {
      const { key, timeStamp } = event;

      // if we were already pressing the current key, don't record it
      if (keyPresses.findIndex((kp) => kp.key === key) >= 0) {
        if (key in ACCENTS) event.preventDefault(); // prevent double typing "interesting" letters

        return;
      }

      // add key to keyPresses and call handler with newest state
      dispatchKeybind([
        { type: "ADD_KEYPRESS", event: { key, timeStamp } },
        keyDownHandler({ key, timeStamp }),
      ]);
    },
    [keyPresses, dispatchKeybind]
  );

  // create keyboard event listeners on mount
  // and clear them on dismount
  useEffect(() => {
    // on mount, add event listeners
    window.addEventListener("keydown", handleAddKeyDown);
    window.addEventListener("keyup", handleAddKeyUp);

    // on unmout, remove event listeners
    return () => {
      window.removeEventListener("keydown", handleAddKeyDown);
      window.removeEventListener("keyup", handleAddKeyUp);
    };
  }, [handleAddKeyDown, handleAddKeyUp]);

  const keyDownHandler =
    ({ key, timeStamp }) =>
    (dispatchKeybind, getState) => {
      if (key in ACCENTS) {
        console.log("detected useful key", key);
      }
    };

  const keyUpHandler =
    ({ key }) =>
    (dispatchKeybind, getState) => {};

  return children;
};

export default EventListener;
