import { combineReducers } from "@reduxjs/toolkit";
import { abilityStoneReducer } from "./ability-stone-slice";

const rootReducer = () => combineReducers({
  abilityStoneReducer,
});

export type RootReducer = ReturnType<ReturnType<typeof rootReducer>>;
export default rootReducer;