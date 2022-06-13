import { useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";

import Modal from "./components/Modal";
import KeyListener from "./components/accents/KeyListener";

// import { keyMap, handlers } from "./util/hotkeys";

import "./App.css";

const defState = {
  display: false,
  key: null,
  targetEl: null,
  pos: null,
};

function App() {
  const [show, setShow] = useState(defState);

  const keyMap = {
    HIDE: ["esc", "backspace"],
  };

  const handlers = {
    HIDE: () => setShow((s) => defState),
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <KeyListener setShow={setShow}>
        <div style={{ display: "flex", flexDirection: "column", width: 300 }}>
          <Modal show={show} />
          <textarea rows="10" />
          {/* <div id="caret-tracker" style={{ zIndex: 2 }} /> */}
        </div>
        <div id="bg" />
      </KeyListener>
    </GlobalHotKeys>
  );
}

export default App;
