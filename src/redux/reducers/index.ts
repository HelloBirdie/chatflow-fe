import { combineReducers } from 'redux';
import { nodesReducer } from './nodesReducers';

const rootReducer = combineReducers({
  nodes: nodesReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
