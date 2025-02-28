import { useState, useEffect, useRef } from "react";
import { GAME_TIMER_LIMIT } from "./helpers";
import useTimer from "./useTimer";
import './index.css'
import WhackAMoleGame from "./Game";

const IntroScreen = ({startGame}) => {
  return (
    <div className="IntroScreen">
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

const InfoBar = ({ score, startGame, timeLeft, running }) => <div className="infoBar">
<p>Score: {score}</p>
{!running && <button onClick={() => startGame()}>Play Again</button>}
<p>Time Left: {timeLeft}</p>
</div>

// create a custom hook for the timer
const WhackAMole = () => {
  const [score, setScore] = useState(null);

  const { timeLeft, running, startTimer } = useTimer(GAME_TIMER_LIMIT);

  const startGame = () => {
    startTimer()
    setScore(0);
  };

  return (
    <div className="WhackAMoleContainer">
      {score !== null ? (
        <>
          <InfoBar score={score} startGame={startGame} timeLeft={timeLeft} running={running} />
          <WhackAMoleGame setScore={setScore} inGame={running} />
        </>
      ) : (
        <IntroScreen startGame={startGame} />
      )}
    </div>
  );
};

export default WhackAMole;
