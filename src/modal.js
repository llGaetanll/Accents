import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as StateProvider } from "react-redux";
import { configure } from "react-hotkeys";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { ModalProvider } from "./util/context";
import Modal from "./components/Modal";
import store from "./store";

import "./App.css";

const MODAL_ID = "accents-modal";

// react hotkeys should listen for events anywhere on the page
configure({
  ignoreTags: [],
});

// create an element to host our shadow
const root = document.createElement("div");
root.setAttribute("id", MODAL_ID);

// this element isolates us from the css in the DOM above
const shadow = root.attachShadow({ mode: "open" });

// load emotion styles into shadow dom
const cache = createCache({
  key: MODAL_ID,
  container: shadow,
});

const ModalApp = () => (
  <CacheProvider value={cache}>
    <ModalProvider>
      <StateProvider store={store}>
        <Modal />
      </StateProvider>
    </ModalProvider>
  </CacheProvider>
);

// inside of our isolated element, create a root element for react
const el = document.createElement("div");
shadow.appendChild(el);

// this is now the root of our react application
const modal = ReactDOM.createRoot(el);

// add the root element to the DOM
document.body.appendChild(root);

// inject the modal into the dom
modal.render(
  <React.StrictMode>
    <ModalApp />
  </React.StrictMode>
);
