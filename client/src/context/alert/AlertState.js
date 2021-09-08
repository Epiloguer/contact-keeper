import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

// Create Initial State
const AlertState = (props) => {
  const initialState = [];

  // Pull out state and dispatch from Reducer, using useReducer hook
  // state allows access to anything in state, dispatch allows us to dispatch objects to the Reuducer
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  // return provider so we can wrap our entire app with this context
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
