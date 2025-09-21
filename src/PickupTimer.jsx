// PickupTimer.jsx
import React, { useEffect, useState } from "react";

export default function PickupTimer({ pickupTime = "20:00", pickupInfo = "for pickup tomorrow from 12:00" }) {
  const [timeLeft, setTimeLeft] = useState({ hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const [targetHour, targetMinute] = pickupTime.split(":").map(Number);

      let target = new Date();
      target.setHours(targetHour, targetMinute, 0, 0);

      // If it's already past the target time, move to tomorrow
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    updateTimer(); // initialize immediately
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [pickupTime]);

  return (
    <div className="flex flex-col items-start p-4 rounded-lg bg-white mb-1 mt-1 gap-2">
    <p className="text-gray-600 text-sm pl-1">
      Pickup from Rozetka stores — <span className="text-green-600">FREE</span>
    </p>
    <div className="flex items-center bg-gray-100 rounded-lg w-full p-4 gap-2">
      <p className="text-gray-800 text-sm mr-2">Order within:</p>
  
      {/* Timer */}
      <div className="flex items-center gap-1">
  <span className="bg-green-100 text-black font-bold text-sm px-2 py-1 rounded border-t-2 border-green-700 w-8 text-center">
    {timeLeft.hours}
  </span>
  <span className="text-black text-sm">:</span>
  <span className="bg-green-100 text-black font-bold text-sm px-2 py-1 rounded border-t-2 border-green-700 w-8 text-center">
    {timeLeft.minutes}
  </span>
  <span className="text-black text-sm">:</span>
  <span className="bg-green-100 text-black font-bold text-sm px-2 py-1 rounded border-t-2 border-green-700 w-8 text-center">
    {timeLeft.seconds}
  </span>
</div>
  
      <p className="text-gray-600 text-sm">– {pickupInfo}</p>
    </div>
  </div>
  );
}