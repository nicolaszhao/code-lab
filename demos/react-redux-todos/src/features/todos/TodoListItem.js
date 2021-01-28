import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ColorsFilters } from '../filters/filtersSlice';
import { selectTodoById, todoColorSelected, todoToggled, todoDeleted } from '../todos/todosSlice';

export const TodoListItem = ({ todoId }) => {
  const todo = useSelector(state => selectTodoById(state, todoId));
  const todoInputId = `todo-list-item-${todoId}`;
  const dispatch = useDispatch();
  const onCompletedChange = () => {
    dispatch(todoToggled(todoId));
  };

  const onColorChagne = (e) => {
    dispatch(todoColorSelected(todoId, e.target.value));
  };

  const onDelete = () => {
    dispatch(todoDeleted(todoId));
  };

  return (
    <li style={{ display: 'flex', alignItems: 'center' }}>
      <input 
        type="checkbox"
        id={todoInputId}
        checked={todo.completed}
        onChange={onCompletedChange}
      />
      <label 
        htmlFor={todoInputId} 
        style={{ 
          color: todo.color, 
          margin: '0 .5em',
          flex: '1',
        }}
      >
        {todo.text}
      </label>
      <select 
        onChange={onColorChagne} 
        value={todo.color}
      >
        <option value=""></option>
        {Object.entries(ColorsFilters).map(([label, value]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <button type="button" onClick={onDelete}>&times;</button>
    </li>
  );
};
