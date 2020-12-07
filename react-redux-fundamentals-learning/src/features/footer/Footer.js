import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusFilter } from './StatusFilter';
import { ColorsFilter } from './ColorsFilter';
import { selectTodos } from '../todos/todosSlice';

export const Footer = () => {
  const dispatch = useDispatch();
  const todosRemaining = useSelector(state => {
    const uncompletedTodos = selectTodos(state).filter(todo => !todo.completed);
    return uncompletedTodos.length
  });
  const { status, colors } = useSelector(state => state.filters);
  const onStatusChange = status => 
    dispatch({ type: 'filters/statusFilterChanged', payload: status });
  
  const onColorsChange = (color, changeType) => {
    dispatch({ 
      type: 'filters/colorFilterChanged', 
      payload: { color, changeType }, 
    });
  };

  const onAllCompletedMark = () => {
    dispatch({
      type: 'todos/allCompleted'
    });
  };

  const onCompletedClear = () => dispatch({ type: 'todos/completedCleared' });

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
