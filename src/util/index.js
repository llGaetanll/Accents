import { useState, useRef } from "react";

/**
 * A reducer hook that allows for redux's async action creator pattern;
 * https://redux.js.org/advanced/async-actions#async-action-creators
 * Also allows for sequential dispatching of multiple actions if an array is passed,
 * Is otherwise the same as the normal useReducer hook
 * @author TarVK
 * @param {Function} reducer The reducer to use
 * @param {*} initialState The intitial state
 * @param {object[]} actions The initial actions to dispatch
 * @returns {[state, dispatch, initializing, initPromise]} The resulting state and dispatch function
 */
export const useAsyncReducer = (reducer, initialState, ...actions) => {
  let ref;

  // Create a way of forcing an update
  const [, setState] = useState(1);
  const forceUpdate = () => ref.current && setState((v) => v + 1);

  // Create a ref to store our state and dispatcher, and initialize it
  ref = useRef();
  if (!ref.current || ref.current.reducer !== reducer) {
    // Create the initial state
    let state = initialState;

    // Create the dispatcher that alters the state and forces updates
    const dispatch = async (action) => {
      // If the action is an array of actions, dispatch them in sequence
      if (action instanceof Array) {
        if (!action[0]) return [];
        const result = await dispatch(action[0]);
        return [result, ...(await dispatch(action.slice(1)))];
      }

      // If the action is an action creator, call it
      if (action instanceof Function) {
        const result = action(dispatch, () => state);

        // Return a promise indicating whether the whole action was dispatched
        if (result instanceof Promise) return result;
        return Promise.resolve(result);
      }

      // If the action is a regular action, obtain the new state and force an update
      state = reducer(state, action);
      forceUpdate();

      // Return a promise for consistency (dispatch immediately resolved)
      return Promise.resolve();
    };

    // Execute the initial actions
    let initPromise = Promise.resolve();
    if (actions.length > 0) {
      initPromise = dispatch(actions);
      initPromise.then(() => {
        // Indicate that initializing is done
        ref.current.initializing = false;
        forceUpdate();
      });
    }

    // Return the state getter and the dispatcher
    ref.current = {
      getState: () => state,
      dispatch,
      reducer,
      initializing: actions.length > 0,
      initPromise,
    };
  }

  // Return the state and dispatcher
  return [
    ref.current.getState(),
    ref.current.dispatch,
    ref.current.initializing,
    ref.current.initPromise,
  ];
};
