import { configureStore } from "@reduxjs/toolkit";

// import storage from "redux-persist-indexeddb-storage";

import { stateReducer } from "./state/index";

export default configureStore({
  reducer: stateReducer,
  devTools: true,
});
