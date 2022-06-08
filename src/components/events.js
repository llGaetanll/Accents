import { useEffect, useCallback } from "react";

import { useAsyncReducer } from "../util";

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
      const code = event;

      return {
        ...state,
        keyPresses: state.keyPresses.filter(
          (keyPress) => keyPress.code !== code
        ),
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
    ({ code, timeStamp }) => {
      dispatchKeybind([
        keyUpHandler({ code, timeStamp }),
        { type: "REM_KEYPRESS", event: code },
      ]); // handle keyPress and remove key
    },
    [dispatchKeybind]
  );

  // called whenever a keyDown is detected
  // it calls keyDownHandler which handles any further logic
  const handleAddKeyDown = useCallback(
    (event) => {
      const { code, timeStamp } = event;

      // if we were already pressing the current key, don't record it
      if (keyPresses.findIndex((key) => key.code === code) >= 0) {
        event.preventDefault(); // prevent double typing letters
        return;
      }

      // add key to keyPresses and call handler with newest state
      dispatchKeybind([
        { type: "ADD_KEYPRESS", event: { code, timeStamp } },
        keyDownHandler({ code, timeStamp }),
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
    ({ code }) =>
    (dispatchKeybind, getState) => {
      console.log("detected keydown", code);
    };

  const keyUpHandler =
    ({ code }) =>
    (dispatchKeybind, getState) => {
      console.log("detected keyup", code);
    };

  return children;
};

export default EventListener;
