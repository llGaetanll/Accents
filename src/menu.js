import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as StateProvider } from "react-redux";
import { Store } from "webext-redux";

import Menu from "./components/Menu";

// This is the root component of our extension menu
const MenuApp = () => (
  <div
    css={{
      width: 300,
      height: 300,
    }}
  >
    <Menu />
  </div>
);

// proxy our store from our background page
const proxyStore = new Store();

// once the store is ready, render our the menu
proxyStore.ready().then(() => {
  // This file renders the popup window when clicking on the app icon
  const menu_el = document.getElementById("root");
  const menu = ReactDOM.createRoot(menu_el);

  menu.render(
    <React.StrictMode>
      <StateProvider store={proxyStore}>
        <MenuApp />
      </StateProvider>
    </React.StrictMode>
  );
});
