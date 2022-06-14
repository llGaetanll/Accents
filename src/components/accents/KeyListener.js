import { useEffect, useCallback, useContext } from "react";

import { ModalContext } from "../../util/context";
import { useAsyncReducer } from "../../util/index";
import { getTextAreaCaret } from "../../util/caret";
import { ACCENTS } from "../../util/data";
import { setChar } from "../../util/text";

// the default state of our async reducer
const defState = {
  keyPresses: [],
  timeout: null,
};

// number of miliseconds required to press down key before modal is displayed
const MIN_PRESS_MS = 700;

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
    case "CLEAR_KEYPRESSES": {
      return {
        ...state,
        keyPresses: [],
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

const keybindList = [
  ...Object.keys(ACCENTS),
  ...[].concat.apply(
    [],
    Object.keys(ACCENTS).map((accent) =>
      ACCENTS[accent].map((_, i) => [accent, i + 1].join(""))
    )
  ),
];

// console.log(keybindList);

const KeyListener = ({ children, setShow }) => {
  const { display, key: modalKey, hide, show } = useContext(ModalContext);

  const [keybindState, dispatchKeybind] = useAsyncReducer(
    keybindReducer,
    defState
  );

  const { keyPresses } = keybindState;

  // this runs when the timeout has passed and
  // the modal is about to be displayed
  const displayModal = useCallback(
    (key, targetEl) => {
      // get the (x, y) position of the caret from the target element
      const [x, y] = getTextAreaCaret(targetEl);

      // const tracker = document.getElementById("caret-tracker");
      // tracker.style.top = y + "px";
      // tracker.style.left = x + "px";

      // modal may need target element for inserting characters at the correct index
      show({ display: true, targetEl, key, pos: { x, y } });
    },
    [show]
  );

  // called whenever presses a key
  const keyDownHandler = useCallback(
    (event) => (dispatchKeybind, getState) => {
      const { key, target: targetEl } = event;

      const keybind = getState().keyPresses.map((kp) => kp.key);
      const keybindStr = keybind.join("");

      // console.log(keybind, keybindStr, keybindList.indexOf(keybindStr));

      // pressing any key hides the modal
      if (display) hide();

      // if the user is pressing a key combo that we care about
      // TODO: detect if only last or last two keys are good instead
      if (keybindList.indexOf(keybindStr) > -1) {
        // if we use the keyboard shortcut for typing in the accent,
        // type it in directly
        if (keybind.length > 1) {
          const [key, idx] = keybind;
          const char = ACCENTS[key][idx - 1];

          // type the key
          setChar(targetEl, char);
        } else {
          dispatchKeybind([
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
        }
      }

      const numbers = ACCENTS[modalKey]?.map((_, i) => i);

      // check for when the modal is visible and user presses only a number
      if (
        display &&
        !isNaN(keybindStr) &&
        numbers.indexOf(Number(keybindStr) - 1) > -1
      ) {
        // prevent typing in the number
        event.preventDefault();

        const char = ACCENTS[modalKey][Number(keybindStr) - 1];

        // type the key
        setChar(targetEl, char);
      }
    },
    [display, modalKey, hide, displayModal]
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
      dispatchKeybind(keyUpHandler({ key, timeStamp }));

      // Note that this will NOT detect the keyup of <key>
      // when `meta + <key>` is pressed. This is known behavior, see:
      //
      // https://stackoverflow.com/questions/27380018
      //
      // Thus we clear the stack on a Meta keyup event
      if (key === "Meta") dispatchKeybind({ type: "CLEAR_KEYPRESSES" });
      else dispatchKeybind({ type: "REM_KEYPRESS", event: key });
    },
    [dispatchKeybind]
  );

  // called whenever a keyDown is detected
  // it adds the given keypress and calls keyDownHandler which handles any further logic
  const handleAddKeyDown = useCallback(
    (event) => {
      const { key, timeStamp } = event;

      const prevKeybinds = keyPresses.map((kp) => kp.key);

      // whether we've seen that key pressed yet
      const seen = prevKeybinds.indexOf(key) > -1;

      // include the current key
      const allKeybinds = seen ? prevKeybinds : [...prevKeybinds, key];
      const keybindStr = allKeybinds.join("");

      // only record keys we've not seen before
      if (!seen)
        dispatchKeybind({ type: "ADD_KEYPRESS", event: { key, timeStamp } });

      // if the user is pressing a key combo that we care about
      // TODO: detect if only last or last two keys are good instead
      const accentKeybind = keybindList.indexOf(keybindStr) > -1;

      // key combo must be valid, we prevent any numbers from being typed, or type only one letter character
      if (accentKeybind && (keybindStr.length > 1 || seen))
        event.preventDefault();

      // dont dispatch a new event if we've seen the key combo beforehand
      if (!seen) dispatchKeybind(keyDownHandler(event));
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
