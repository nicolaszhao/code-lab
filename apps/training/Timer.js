import { useEffect, useState } from 'react';

function useTimer(initialValue) {
  const [time, setTime] = useState(initialValue);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;

    function tick() {
      timer = setTimeout(() => {
        setTime((t) => t + 1);
        tick();
      }, 1000);
    }

    if (running) {
      tick();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [running]);

  return {
    time,
    stop() {
      setRunning(false);
    },
    start() {
      setRunning(true);
    },
  };
}

export default function Timer({ initialValue }) {
  const { time, stop: stopTimer, start: startTimer } = useTimer(initialValue);

  return (
    <div>
      <button onClick={startTimer}>Start</button>
      <span> | </span>
      <button onClick={stopTimer}>Stop</button>
      <span> | </span>
      <strong>{time}</strong>
    </div>
  );
}
