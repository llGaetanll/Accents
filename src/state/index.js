import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const reducers = {};

const { reducer, actions } = createSlice({
  name: "accents/state",
  initialState,
  reducers,
});

export const { show, hide } = actions;
export const stateReducer = reducer;
