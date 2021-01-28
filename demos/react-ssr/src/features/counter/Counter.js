import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, selectCount } from "./counterSlice";
import './index.css';

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className="counter">
      <button onClick={() => dispatch(increment())}>
        +
      </button>
      <span className="counter-value">{count}</span>
      <button onClick={() => dispatch(decrement())}>
        -
      </button>
    </div>
  );
}
