import { Provider as StateProvider } from "react-redux";
import { ModalProvider } from "./util/context";

import Modal from "./components/Modal";

import store from "./store";

import "./App.css";

function App() {
  return (
    <ModalProvider>
      <StateProvider store={store}>
        <div style={{ display: "flex", flexDirection: "column", width: 300 }}>
          <Modal />
          <textarea rows="10" />
          {/* <div id="caret-tracker" style={{ zIndex: 2 }} /> */}
        </div>
        <div id="bg" />
      </StateProvider>
    </ModalProvider>
  );
}

export default App;
