// src/App.js
import React, { useState, useEffect } from 'react';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import Clock from 'react-live-clock';

const App = () => {
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [remainingTime, setRemainingTime] = useState(selectedDuration * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const handleDurationChange = (event) => {
    const newDuration = parseInt(event.target.value, 10);
    setSelectedDuration(newDuration);
    setRemainingTime(newDuration * 60);
    setTimerActive(false);
  };

  const startTimer = () => {
    setTimerActive(true);
    setStartTime(Date.now());
  };

  const pauseTimer = () => {
    setTimerActive(false);
    setRemainingTime((prevRemainingTime) => prevRemainingTime - Math.floor((Date.now() - startTime) / 1000));
  };

  useEffect(() => {
    let interval;
    if (timerActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive, remainingTime]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      <div className="p-4 md:p-8 lg:p-12 xl:p-16 w-full max-w-xl rounded-md shadow-lg text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 text-indigo-600"> TimeFlow</h1>
        <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-purple-500 font-black">
          <Clock format={'hh:mm:ss A'} ticking={true} timezone={'local'} />
        </div>
        <div className="text-md md:text-lg lg:text-xl xl:text-2xl mt-4 text-white font-black uppercase">
          {timerActive || remainingTime > 0 ? (
            <span className='text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold '>
              Remaining Time: {Math.floor(remainingTime / 60)}:{remainingTime % 60} minutes
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="mt-4 flex flex-col items-center">
          <label className="text-md md:text-lg lg:text-xl xl:text-2xl mb-2 font-black">Select Duration:</label>
          <select
            className="p-2 rounded-md bg-gray-950 border border-white text-white text-md md:text-lg lg:text-xl xl:text-2xl shadow-md shadow-white"
            value={selectedDuration}
            onChange={handleDurationChange}
          >
            <option value={10}>10 minutes</option>
            <option value={20}>20 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>60 minutes</option>
          </select>
          {timerActive ? (
            <button
              className="mt-2 p-2 rounded-md bg-purple-500 text-white text-md md:text-lg lg:text-xl xl:text-2xl"
              onClick={pauseTimer}
            >
              <BsFillPauseFill />
            </button>
          ) : (
            <button
              className="mt-2 p-2 rounded-md bg-purple-500 text-white text-md md:text-lg lg:text-xl xl:text-2xl"
              onClick={startTimer}
            >
              <BsFillPlayFill />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
