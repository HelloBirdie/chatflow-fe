import { INode } from '@/interfaces/node';
import { ADD_NODE, REMOVE_NODE, SET_NODES } from './actionTypes';

interface IAddNodeAction {
  type: typeof ADD_NODE;
  payload: INode;
}

interface IRemoveNodeAction {
  type: typeof REMOVE_NODE;
  payload: string; // assuming you're removing a node by its id
}

interface ISetNodesAction {
  type: typeof SET_NODES;
  payload: INode[];
}

export const addNode = (node: INode): IAddNodeAction => {
  return {
    type: ADD_NODE,
    payload: node,
  };
};

export const removeNode = (id: string): IRemoveNodeAction => {
  return {
    type: REMOVE_NODE,
    payload: id,
  };
};

export const setNodes = (nodes: INode[]): ISetNodesAction => {
  return {
    type: SET_NODES,
    payload: nodes,
  };
};

export type NodeActionTypes =
  | IAddNodeAction
  | IRemoveNodeAction
  | ISetNodesAction;
