import { useEffect, useCallback } from "react";
import getCaretCoordinates from "textarea-caret";

import { useAsyncReducer } from "../util";
import { ACCENTS } from "../util/data";

const defState = {
  keyPresses: [],
  timeout: null,
};

// number of miliseconds required to press down key before modal is displayed
const MIN_PRESS_MS = 500;

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

    case "START_TIMEOUT": {
      const { time, timeoutCallback } = event;

      return {
        ...state,
        timeout: setTimeout(timeoutCallback, time),
      };
    }
    case "RESET_TIMEOUT": {
      clearTimeout(state.timeout);

      return {
        ...state,
        timeout: null,
      };
    }

    default:
      return state;
  }
};

const EventListener = ({ children, setShow }) => {
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
        // if the key is an accents key, we don't wanna double type it
        if (key in ACCENTS) event.preventDefault();

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

    // on unmount, remove event listeners
    return () => {
      window.removeEventListener("keydown", handleAddKeyDown);
      window.removeEventListener("keyup", handleAddKeyUp);
    };
  }, [handleAddKeyDown, handleAddKeyUp]);

  // this runs when the timeout has passed and
  // the modal is about to be displayed
  const displayModal = (key) => {
    console.log("show modal");
    setShow({ display: true, key });
  };

  const keyDownHandler =
    ({ key, timeStamp }) =>
    (dispatchKeybind, getState) => {
      if (key in ACCENTS) {
        console.log("detected useful key", key);

        return dispatchKeybind([
          {
            type: "START_TIMEOUT",
            event: {
              time: MIN_PRESS_MS,
              timeoutCallback: () => {
                clearTimeout(getState().timeout);

                displayModal(key);
              },
            },
          },
        ]);
      }
    };

  const keyUpHandler =
    ({ key }) =>
    (dispatchKeybind, getState) => {
      return dispatchKeybind({ type: "RESET_TIMEOUT" });
    };

  return children;
};

export default EventListener;
