import "./App.css";
import { GlobalHotKeys } from "react-hotkeys";

import Popup from "./components/popup";

import { keyMap, handlers } from "./util/hotkeys";

function App() {
  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Popup />
      <div id="bg"></div>
    </GlobalHotKeys>
  );
}

export default App;
