import { INode } from '@/interfaces/node';
import { NodeActionTypes } from '../actions/nodeActions';
import { ADD_NODE, REMOVE_NODE, SET_NODES } from '../actions/actionTypes';

interface INodesState {
  nodes: INode[];
}

const initialState: INodesState = {
  nodes: [],
};

export function nodesReducer(
  state = initialState,
  action: NodeActionTypes,
): INodesState {
  switch (action.type) {
    case ADD_NODE:
      return {
        nodes: [...state.nodes, action.payload],
      };
    case REMOVE_NODE:
      return {
        nodes: state.nodes.filter((node) => node.id !== action.payload),
      };
    case SET_NODES:
      return {
        nodes: action.payload,
      };
    default:
      return state;
  }
}
