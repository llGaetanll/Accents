import { Provider as StateProvider } from "react-redux";
import { ModalProvider } from "./util/context";

import Modal from "./components/Modal";
import TestLayout from "./TestLayout";

import store from "./store";

import "./App.css";

function App() {
  return (
    <ModalProvider>
      <StateProvider store={store}>
        <Modal />
        <TestLayout />
      </StateProvider>
    </ModalProvider>
  );
}

export default App;
