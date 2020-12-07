import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { StatusFilters } from '../filters/filtersSlice';
import { client } from '../../api/client';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get('/fakeApi/todos');
  return response.todos;
});

export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async text => {
  const response = await client.post('/fakeApi/todos', { todo: { text } });
  return response.todo;
});

const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState({
  status: 'idle',
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoToggled(state, action) {
      const todo = state.entities[action.payload];
      todo.completed = !todo.completed;
    },
    todoColorSelected: {
      reducer(state, action) {
        const { todoId, color } = action.payload;
        state.entities[todoId].color = color;
      },
      prepare(todoId, color) {
        return { payload: { todoId, color } };
      },
    },
    todoDeleted: todosAdapter.removeOne,
    allTodosCompleted(state) {
      Object.values(state.entities).forEach(todo => todo.completed = true);
    },
    completedTodosCleared(state) {
      const completedIds = Object.values(state.entities)
        .filter(todo => todo.completed)
        .map(todo => todo.id);
      todosAdapter.removeMany(state, completedIds);
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchTodos.fulfilled]: (state, action) => {
      todosAdapter.setAll(state, action.payload);
      state.status = 'idle';
    },
    [saveNewTodo.fulfilled]: todosAdapter.addOne,
  },
});

export const {
  todoAdded,
  todoToggled,
  todoDeleted,
  todoColorSelected,
  allTodosCompleted,
  completedTodosCleared,
} = todoSlice.actions;

export default todoSlice.reducer;

const selectTodoEntities = (state) => state.todos.entities

export const {
  selectAll: selectTodos,
  selectById: selectTodoById,
} = todosAdapter.getSelectors(state => state.todos);

export const selectTodoIds = createSelector(
  selectTodos,
  todos => todos.map(todo => todo.id),
);

export const selectFilteredTodos = createSelector(
  selectTodos,
  state => state.filters,
  (todos, { status, colors }) => {
    const showAllTodos = status === StatusFilters.All;

    if (showAllTodos && colors.length === 0) {
      return todos;
    }

    const completedStatus = status === StatusFilters.Completed;
    return todos.filter(todo => {
      const statusMatches = showAllTodos || todo.completed === completedStatus;
      const colorsMatches = colors.length === 0 || colors.includes(todo.color);
      return statusMatches && colorsMatches;
    });
  },
);

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  todos => todos.map(todo => todo.id),
);
