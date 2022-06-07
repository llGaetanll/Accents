import "./App.css";
import { GlobalHotKeys } from "react-hotkeys";

import { keyMap, handlers } from "./util/hotkeys";

function App() {
  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <p>Hello World</p>
    </GlobalHotKeys>
  );
}

export default App;
