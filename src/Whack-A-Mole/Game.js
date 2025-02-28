import { useState, useEffect, useRef } from "react";
import { getRandom, HOLE_IMG_URL, MOLE_IMG_URL } from "./helpers";

const WhackAMoleGame = ({ setScore, inGame }) => {
  const [visibleMoles, setVisibleMoles] = useState({}); // store index: timeout

  const showMole = () => {
    let randomIdx;

    do {
      randomIdx = getRandom(0, 9);
    } while (visibleMoles[randomIdx]);

    const timeout = setTimeout(() => {
      deleteMole(randomIdx);
    }, getRandom(1100, 1500));

    setVisibleMoles((prev) => ({ ...prev, [randomIdx]: timeout }));
  };

  const deleteMole = (index) => {
    setVisibleMoles((prev) => {
      const updatedMoles = { ...prev };
      clearTimeout(updatedMoles[index]);
      delete updatedMoles[index];
      return updatedMoles;
    });
  };

  const handleMoleClick = (index) => {
    if (inGame) {
      setScore((prev) => prev + 1);
      deleteMole(index);
    }
  };

  useEffect(() => {
    if (!inGame) {
        return;
    };

    const interval = setInterval(() => {
      showMole();
    }, 550);

    return () => clearInterval(interval);
  }, [inGame]);

  return (
    <div className="game-grid">
      {Array.from({ length: 9 }, (_, i) => (
        <div className="grid-item">
          <img
            src={MOLE_IMG_URL}
            onClick={() => handleMoleClick(i)}
            className={`mole ${i in visibleMoles ? "visible" : "hidden"}`}
            alt="mole"
          />
          <img src={HOLE_IMG_URL} className="hole" alt="hole" />
        </div>
      ))}
    </div>
  );
};

export default WhackAMoleGame;
