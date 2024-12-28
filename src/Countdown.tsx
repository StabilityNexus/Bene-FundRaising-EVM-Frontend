import { useState, useEffect } from "react";

interface CountdownProps {
  targetTimestamp: number;
  variant?: "default" | "compact"; // Add different styles as variants
}

const Countdown: React.FC<CountdownProps> = ({
  targetTimestamp,
  variant = "default",
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetTimestamp - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Call immediately to avoid initial delay

    return () => clearInterval(interval); // Cleanup on unmount
  }, [targetTimestamp]);

  if (variant === "compact") {
    return (
      <span>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
        {timeLeft.seconds}s
      </span>
    );
  }

  return (
    <div className="flex items-center space-x-4 flex-wrap">
      <span className="z-10 flex items-center text-2xl md:text-5xl text-purple-500 [text-shadow:_2px_2px_#F5F3FF,_1px_2px_#F5F3FF]">
        {timeLeft.days}
        <span className="md:text-xl text-sm font-bold text-white [text-shadow:none] ml-1">
          days
        </span>
      </span>
      <span className="z-10 flex items-center text-2xl md:text-5xl text-purple-500 [text-shadow:_2px_2px_#F5F3FF,_1px_2px_#F5F3FF]">
        {timeLeft.hours}
        <span className="md:text-xl text-sm font-bold text-white [text-shadow:none] ml-1">
          hours
        </span>
      </span>
      <span className="z-10 flex items-center text-2xl md:text-5xl text-purple-500 [text-shadow:_2px_2px_#F5F3FF,_1px_2px_#F5F3FF]">
        {timeLeft.minutes}
        <span className="md:text-xl text-sm font-bold text-white [text-shadow:none] ml-1">
          minutes
        </span>
      </span>
      <span className="z-10 flex items-center text-2xl md:text-5xl text-purple-500 [text-shadow:_2px_2px_#F5F3FF,_1px_2px_#F5F3FF]">
        {timeLeft.seconds}
        <span className="md:text-xl text-sm font-bold text-white [text-shadow:none] ml-1">
          seconds
        </span>
      </span>
    </div>
  );
};

export default Countdown;
