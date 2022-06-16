import { Provider as StateProvider } from "react-redux";
import { ModalProvider } from "./util/context";

import Modal from "./components/Modal";
import TestLayout from "./TestLayout";
import Menu from "./components/Menu";

import store from "./store";

import "./App.css";

function App() {
  return (
    <ModalProvider>
      <StateProvider store={store}>
        <Modal />
        <div
          style={{
            width: 300,
            height: "auto",

            border: "1px solid black",
          }}
        >
          <Menu />
        </div>
      </StateProvider>
    </ModalProvider>
  );
}

export default App;
