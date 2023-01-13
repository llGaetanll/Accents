import { configureStore } from "@reduxjs/toolkit";
import { wrapStore } from "webext-redux";

import { stateReducer } from "./state";

// create a new redux store and add our reducers
const store = configureStore({
  reducer: stateReducer,
});

// allow the store to be accessed in other parts of the extension
wrapStore(store);
