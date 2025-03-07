import React, { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";

const TimerBlock = ({ value }) => (
  <div className="w-12 h-14 bg-[#222222] rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg">
    <span className="text-2xl font-mono text-white font-medium">{value}</span>
  </div>
);

const Separator = () => (
  <div className="mx-1 text-white text-2xl font-medium flex flex-col justify-center">
    <div className="w-1.5 h-1.5 bg-white/60 rounded-full mb-1" />
    <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
  </div>
);

const Timer = ({ minutes, onTimeUp }) => {
  const [time, setTime] = useState(minutes * 60); // Convert minutes to seconds

  useEffect(() => {
    if (time === 0) {
      onTimeUp(); // Trigger test completion when time is up
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onTimeUp]);

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return {
      hours: String(hours).padStart(2, "0").split(""),
      minutes: String(minutes).padStart(2, "0").split(""),
      seconds: String(seconds).padStart(2, "0").split(""),
    };
  };

  const { hours, minutes: mins, seconds } = formatTime();

  return (
    <div className="bg-[#1A1F2C] rounded-2xl">
      <div className="bg-black/40 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/10">
        <div className="flex flex-row gap-2 items-center mb-2">
          <FiClock size={22} className="text-white" />
          <p className="text-white font-semibold">Time Remaining</p>
        </div>

        <div className="flex items-center space-x-1">
          <TimerBlock value={mins[0]} />
          <TimerBlock value={mins[1]} />
          <Separator />
          <TimerBlock value={seconds[0]} />
          <TimerBlock value={seconds[1]} />
        </div>
      </div>
    </div>
  );
};

export default Timer;
