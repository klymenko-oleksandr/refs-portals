import {useRef, useState} from 'react';

export default function Player() {
  const inputRef = useRef();
  const [playerName, setPlayerName] = useState('');

  function handleClick() {
    setPlayerName(inputRef.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {playerName || 'unknown entity'}</h2>
      <p>
        <input type="text" ref={inputRef} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
