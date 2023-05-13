import { INode } from '@/interfaces/node';
import { ADD_NODE, REMOVE_NODE, SET_NODES } from './actionTypes';

interface AddNodeAction {
  type: typeof ADD_NODE;
  payload: INode;
}

interface RemoveNodeAction {
  type: typeof REMOVE_NODE;
  payload: string; // assuming you're removing a node by its id
}

interface SetNodesAction {
  type: typeof SET_NODES;
  payload: INode[];
}

export type NodeActionTypes = AddNodeAction | RemoveNodeAction | SetNodesAction;
