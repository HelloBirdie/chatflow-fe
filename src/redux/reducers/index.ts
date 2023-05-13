import { combineReducers } from 'redux';
import { nodesReducer } from './nodesReducers';
import { edgesReducer } from './edgesReducers';

const rootReducer = combineReducers({
  nodes: nodesReducer,
  edges: edgesReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
