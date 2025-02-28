import { useState, useEffect, useRef } from 'react';
import { GAME_TIMER_LIMIT } from "./helpers";

const useTimer = (timeLimit=GAME_TIMER_LIMIT) => {
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [running, setRunning] = useState(false);
      const intervalRef = useRef(null);

    const startTimer = () => {
        if (intervalRef.current) return;
        setRunning(true);
        setTimeLeft(timeLimit)
        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => prev-1);
        }, 1000)
    }

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setRunning(false);
        }
    }

    useEffect(() => {
        if (timeLeft <= 0) {
            stopTimer();
        }
    }, [timeLeft])

    return { timeLeft, running, startTimer }
}

export default useTimer;