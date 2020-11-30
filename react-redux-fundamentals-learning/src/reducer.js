import { combineReducers } from 'redux';
import todosReducer from './features/todos/todosSlice';
import filtersReducer from './features/filters/filtersSlice';

const rootReducdr = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
});

export default rootReducdr;
