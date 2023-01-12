import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as StateProvider } from "react-redux";

import Menu from "./components/Menu";
import store from "./store";

// This is the root component of our extension menu
const MenuApp = () => (
  <StateProvider store={store}>
    <div
      css={{
        width: 300,
        height: 300,
      }}
    >
      <Menu />
    </div>
  </StateProvider>
);

// This file renders the popup window when clicking on the app icon
const menu_el = document.getElementById("root");
const menu = ReactDOM.createRoot(menu_el);

menu.render(
  <React.StrictMode>
    <MenuApp />
  </React.StrictMode>
);
