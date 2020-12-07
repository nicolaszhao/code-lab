import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusFilter } from './StatusFilter';
import { ColorsFilter } from './ColorsFilter';
import { selectTodos, allTodosCompleted, completedTodosCleared } from '../todos/todosSlice';
import { statusFilterChanged, colorFilterChanged } from '../filters/filtersSlice';

export const Footer = () => {
  const dispatch = useDispatch();
  const todosRemaining = useSelector(state => {
    const uncompletedTodos = selectTodos(state).filter(todo => !todo.completed);
    return uncompletedTodos.length
  });
  const { status, colors } = useSelector(state => state.filters);
  const onStatusChange = status => 
    dispatch(statusFilterChanged(status));
  
  const onColorsChange = (color, changeType) => {
    dispatch(colorFilterChanged({ color, changeType }));
  };

  const onAllCompletedMark = () => {
    dispatch(allTodosCompleted());
  };

  const onCompletedClear = () => dispatch(completedTodosCleared());

  return (
    <footer>
      <section>
        <h3>Actions</h3>
        <div>
          <button type="button" onClick={onAllCompletedMark}>Mark All Completed</button>
          <button type="button" onClick={onCompletedClear}>Clear Completed</button>
        </div>
      </section>

      <section>
        <h3>Remaining Todos</h3>
        {todosRemaining} item left
      </section>

      <StatusFilter status={status} onChange={onStatusChange} />
      <ColorsFilter colors={colors} onChange={onColorsChange} />
    </footer>
  );
};
