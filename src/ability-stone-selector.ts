import { RootReducer } from "./rootReducer";

export const getMaxNodes = (state: RootReducer) => state.abilityStoneReducer.maxNodes;
export const getPIndex = (state: RootReducer) => state.abilityStoneReducer.pIndex;
export const getFacetHistory = (state: RootReducer) => state.abilityStoneReducer.facetHistory;
export const getAbilityStoneState = (state: RootReducer) => state.abilityStoneReducer;
