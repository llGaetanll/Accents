import "./App.css";
import { GlobalHotKeys } from "react-hotkeys";

import Popup from "./components/popup";
import EventListener from "./components/events";

import { keyMap, handlers } from "./util/hotkeys";

function App() {
  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <EventListener>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Popup />
          <textarea rows="10"></textarea>
        </div>
        <div id="bg"></div>
      </EventListener>
    </GlobalHotKeys>
  );
}

export default App;
