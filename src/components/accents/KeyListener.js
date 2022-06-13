import { useEffect, useCallback } from "react";

import { useAsyncReducer } from "../../util";
import { ACCENTS } from "../../util/data";

// the default state of our async reducer
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

const KeyListener = ({ children, setShow }) => {
  const [keybindState, dispatchKeybind] = useAsyncReducer(
    keybindReducer,
    defState
  );

  const { keyPresses } = keybindState;

  // this runs when the timeout has passed and
  // the modal is about to be displayed
  const displayModal = useCallback(
    (key, targetEl) => setShow({ display: true, targetEl, key }),
    [setShow]
  );

  // called whenever presses a key
  const keyDownHandler = useCallback(
    ({ key, targetEl }) =>
      (dispatchKeybind, getState) => {
        // check if the key is "accentable"
        // if so, start a timeout that resolves to `displayModal`
        if (key in ACCENTS)
          return dispatchKeybind([
            {
              type: "START_TIMEOUT",
              event: {
                time: MIN_PRESS_MS,
                timeoutCallback: () => {
                  clearTimeout(getState().timeout);

                  displayModal(key, targetEl);
                },
              },
            },
          ]);
      },
    [displayModal]
  );

  // removes any timeouts
  const keyUpHandler =
    ({ key }) =>
    (dispatchKeybind, getState) => {
      return dispatchKeybind({ type: "RESET_TIMEOUT" });
    };

  // called whenever a keyUp is detected
  // it calls keyUphandler and removes the given keypress
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
  // it adds the given keypress and calls keyDownHandler which handles any further logic
  const handleAddKeyDown = useCallback(
    (event) => {
      const { key, timeStamp, target } = event;

      // if we were already pressing the current key, don't record it
      if (keyPresses.findIndex((kp) => kp.key === key) >= 0) {
        // if the key is an accents key, we don't wanna double type it
        if (key in ACCENTS) event.preventDefault();

        return;
      }

      // add key to keyPresses and call handler with newest state
      dispatchKeybind([
        { type: "ADD_KEYPRESS", event: { key, timeStamp } },
        keyDownHandler({ key, targetEl: target }),
      ]);
    },
    [keyPresses, dispatchKeybind, keyDownHandler]
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

  return children;
};

export default KeyListener;
