import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TodoListItem } from './TodoListItem';
import { selectFilteredTodoIds, fetchTodos } from './todosSlice';

export const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds);
  const loadingStatus = useSelector(state => state.todos.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingStatus === 'idle') {
      dispatch(fetchTodos());
    }
  }, []);

  if (loadingStatus === 'loading') {
    return (
      <div>
        <div style={{ fontSize: '1.8em', fontWeight: 'bold' }}>Loading...</div>
      </div>
    );
  }

  const renderedListItems = todoIds.map(todoId => (
    <TodoListItem key={todoId} todoId={todoId} />
  ))

  return (
    <ul>{renderedListItems}</ul>
  )
};
