import { createSlice } from "@reduxjs/toolkit";
import actionCreatorFactory, { Action } from "typescript-fsa";
import { FacetHistory, IFC, MaxNumOfNodes, probability } from "./constants";

const name = 'ability-stone';

const actionCreator = actionCreatorFactory(name);

export interface IAbilityStoneState {
  maxNodes: MaxNumOfNodes;
  facetedNodes: IFC;
  facetHistory: FacetHistory;
  pIndex: number;
}

const initialState: IAbilityStoneState = {
  maxNodes: 9,
  facetedNodes: {
    r1: [],
    r2: [],
    r3: [],
  },
  facetHistory: [],
  pIndex: 0,
};

function withinMaxNumOfNodes(num: number): num is MaxNumOfNodes {
  return num <= 10 && num >= 6;
}

function findPIndex(facet: boolean, index: number) {
  return facet ? (
    index === probability.length - 1 ? index : index += 1
  ) : (
    index === 0 ? 0 : index -= 1
  );
}

const abilityStoneSlice = createSlice({
  name,
  initialState,
  reducers: {
    changeMaxNodesAC: (state, { payload: { number } }: Action<{ number: number }>) => {
      if (withinMaxNumOfNodes(number)) {
        state.maxNodes = number;
      }
    },
    facetNodeAC: (state, { payload: { rowNumber, facet } }: Action<{ rowNumber: string, facet: boolean }>) => {
      state.pIndex = findPIndex(facet, state.pIndex);
      state.facetHistory = [...state.facetHistory, { rowNumber, facet, pIndex: state.pIndex }];
      state.facetedNodes = { ...state.facetedNodes, [rowNumber]: [...state.facetedNodes[rowNumber], facet] };
    },
    undoFacetNodeAC: (state) => {
      if (!state.facetHistory.length) {
        return;
      }
      const removedNode = state.facetHistory.pop();
      if (removedNode) {
        state.facetedNodes[removedNode.rowNumber].pop();
        state.pIndex = state.facetHistory.length ? state.facetHistory[state.facetHistory.length-1].pIndex : 0;
      }
    },
    resetNodes: (state) => {
      return { ...initialState, maxNodes: state.maxNodes };
    },
  },
});

export const abilityStoneReducer = abilityStoneSlice.reducer;
export const { changeMaxNodesAC, facetNodeAC, undoFacetNodeAC, resetNodes } = abilityStoneSlice.actions;
