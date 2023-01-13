import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: true,
};

const reducers = {
  toggle: (state, _) => {
    state.active = !state.active;
  },
};

const { reducer, actions } = createSlice({
  name: "accents/state",
  initialState,
  reducers,
});

export const { toggle } = actions;
export const stateReducer = reducer;
