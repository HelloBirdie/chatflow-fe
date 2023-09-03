import { combineReducers } from 'redux';
import { nodesReducer } from './nodesReducers';
import { edgesReducer } from './edgesReducers';
import userReducers from './userReducers';

const rootReducer = combineReducers({
  nodes: nodesReducer,
  edges: edgesReducer,
  user: userReducers
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
