import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveNewTodo } from '../todos/todosSlice';

export const Header = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const handleChange = e => setText(e.target.value);
  const handleKeyDown = async e => {
    if (e.which === 13 && text) {
      await dispatch(saveNewTodo(text));
      setText('');
    }
  };

  return (
    <header>
      <input 
        type="text"
        placeholder="What needs to be done?"
        autoFocus={true}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </header>
  );
};
