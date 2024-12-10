import {useRef, useState} from 'react';
import ResultModal from './ResultModal.jsx';

const timeCheckPeriod = 10; // in ms

export default function TimerChallenge({title, targetTime}) {
  const timer = useRef();
  const dialogRef = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    // reset timer
    setTimeRemaining(targetTime * 1000);
    dialogRef.current.open();
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining(prevValue => prevValue - timeCheckPeriod);
    }, timeCheckPeriod)
  }

  function handleStop() {
    clearInterval(timer.current);
    // reset timer
    setTimeRemaining(targetTime * 1000);
    dialogRef.current.open();
  }

  return (
    <>
      <ResultModal ref={dialogRef} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second {targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timeIsActive ? handleStop : handleStart}>
            {timeIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timeIsActive ? 'active' : undefined}>
          {timeIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
