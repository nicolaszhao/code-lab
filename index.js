function useTimer(time) {
  const [duration, setDuration] = useState(time);
  const clearRef = useRef(null);
  
  useEffect(() => {
    let timer = null;

    function tick() {
      timer = setTimeout(() => {
        setDuration(t => t++);
        tick();
      }, 1000);
    }
    tick();

    return () => {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
    };
  });

  return {duration, clearTimer};
}

function Timer() {
  const {time, clearTimer} = useTimer();

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return (
    <div>倒计时:{time}</div>
  );
}

