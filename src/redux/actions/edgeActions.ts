import { IEdge } from '@/interfaces/edge';
import { ADD_EDGE, REMOVE_EDGE, SET_EDGES } from './actionTypes';

interface IAddEdgeAction {
  type: typeof ADD_EDGE;
  payload: IEdge;
}

interface IRemoveEdgeAction {
  type: typeof REMOVE_EDGE;
  payload: string; // removing an edge by its id
}

interface ISetEdgesAction {
  type: typeof SET_EDGES;
  payload: IEdge[];
}

export const addEdge = (edge: IEdge): IAddEdgeAction => {
  return {
    type: ADD_EDGE,
    payload: edge,
  };
};

export const removeEdge = (id: string): IRemoveEdgeAction => {
  return {
    type: REMOVE_EDGE,
    payload: id,
  };
};

export const setEdges = (edges: IEdge[]): ISetEdgesAction => {
  return {
    type: SET_EDGES,
    payload: edges,
  };
};

export type EdgeActionTypes =
  | IAddEdgeAction
  | IRemoveEdgeAction
  | ISetEdgesAction;
