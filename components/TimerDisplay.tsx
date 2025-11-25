import React from 'react';

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, totalTime }) => {
  const radius = 120;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (timeLeft / totalTime) * circumference;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Determine color based on time left
  let strokeColor = "text-cyan-400";
  if (timeLeft < 60) strokeColor = "text-red-500";
  else if (timeLeft < 150) strokeColor = "text-yellow-400";

  return (
    <div className="relative flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="rotate-[-90deg] transform"
      >
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="text-slate-700"
        />
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s linear' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={strokeColor}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-5xl font-bold font-mono ${strokeColor}`}>
          {formattedTime}
        </span>
        <span className="text-slate-400 text-sm mt-2 uppercase tracking-widest">
          Sisa Waktu
        </span>
      </div>
    </div>
  );
};

export default TimerDisplay;