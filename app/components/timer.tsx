// components/Timer.js
import { useEffect, useState } from 'react';

const Timer = () => {
    // Initial time is 2 hours (in milliseconds)
    const initialTime = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        // Set interval to update the timer every second
        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => {
                // Stop the timer when time reaches zero
                if (prevTime <= 0) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1000; // Decrease by 1 second (1000 ms)
            });
        }, 1000); // 1000 ms = 1 second

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Function to format time in hours, minutes, seconds
    const formatTime = (time: number) => {
        const hours = Math.floor(time / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return {
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
        };
    };

    const { hours, minutes, seconds } = formatTime(timeLeft);

    return (
        <p className="text-bold text-xl">{hours}:{minutes}:{seconds}</p>
    );
};

export default Timer;
