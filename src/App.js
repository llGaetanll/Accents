import { useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";

import Modal from "./components/Modal";
import KeyListener from "./components/accents/KeyListener";

// import { keyMap, handlers } from "./util/hotkeys";

import "./App.css";

function App() {
  const [show, setShow] = useState({
    display: false,
    key: null,
    targetEl: null,
  });

  const keyMap = {
    HIDE: ["esc", "backspace"],
  };

  const handlers = {
    HIDE: () => setShow((s) => ({ display: false, key: null })),
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <KeyListener setShow={setShow}>
        <div style={{ display: "flex", flexDirection: "column", width: 300 }}>
          <Modal show={show} />
          <textarea rows="10" />
        </div>
        <div id="bg" />
      </KeyListener>
    </GlobalHotKeys>
  );
}

export default App;
