import React, { useState, useEffect } from 'react';

function TimerState({ isRunning , reset }) {
  const [milli, setmilli] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let interval;

    if (isRunning) {
        const currentTime = Date.now()
        setStartTime((prevStartTime) => prevStartTime ?? currentTime - milli);
      console.log("Timer started");
      interval = setInterval(() => {
        setmilli(Date.now() - startTime);
      }, 10);
    } else {
      console.log("Timer stopped");
      clearInterval(interval);
    }

    // Clean up interval on unmount or when isRunning changes
    return () => clearInterval(interval);

  }, [isRunning, startTime, milli]);  // Depend on isRunning to reset interval when it changes

  useEffect(() =>{
    if(reset){
        setmilli(0);
        setStartTime(null)
    }
  },[reset])

  const mintues = Math.floor(milli / 60000);
  const second = Math.floor((milli % 60000)/1000);
  const millisec = milli % 1000;

  return <div> {String(mintues).padStart(2, '0')} : {String(second).padStart(2, '0')} : {String(millisec).padStart(3, '0')}</div>;
}

export default TimerState;
