import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import './App.css';
import Timer from './Timer';

function App() {
  const [timerVisible, toggleTimer] = useState(true);

  return (
    <div className="app">
      <header className="app-header">
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <section>
        <div style={{ padding: '1em' }}>
          <input 
            id="timer-checker" 
            type="checkbox" 
            checked={timerVisible} 
            onChange={(e) => toggleTimer(e.target.checked)} 
          />
          <label htmlFor="timer-checker">Show Timer</label>
          {timerVisible && <Timer initialValue={0} />}
        </div>
      </section>
    </div>
  );
}

export default hot(App);
