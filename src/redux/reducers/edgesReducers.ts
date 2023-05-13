import { IEdge } from '@/interfaces/edge';
import { EdgeActionTypes } from '../actions/edgeActions';
import { ADD_EDGE, REMOVE_EDGE, SET_EDGES } from '../actions/actionTypes';

interface IEdgesState {
  edges: IEdge[];
}

const initialState: IEdgesState = {
  edges: [],
};

export function edgesReducer(
  state = initialState,
  action: EdgeActionTypes,
): IEdgesState {
  switch (action.type) {
    case ADD_EDGE:
      return {
        edges: [...state.edges, action.payload],
      };
    case REMOVE_EDGE:
      return {
        edges: state.edges.filter((edge) => edge.id !== action.payload),
      };
    case SET_EDGES:
      return {
        edges: [...action.payload],
      };
    default:
      return state;
  }
}
