import { useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";

import Popup from "./components/popup";
import EventListener from "./components/events";

// import { keyMap, handlers } from "./util/hotkeys";

import "./App.css";

function App() {
  const [show, setShow] = useState(false);

  const keyMap = {
    HIDE: ["esc", "backspace"],
  };

  const handlers = {
    HIDE: () => setShow((s) => ({ display: false, key: null })),
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <EventListener setShow={setShow}>
        <div style={{ display: "flex", flexDirection: "column", width: 300 }}>
          <Popup show={show} />
          <textarea rows="10" />
        </div>
        <div id="bg"></div>
      </EventListener>
    </GlobalHotKeys>
  );
}

export default App;
