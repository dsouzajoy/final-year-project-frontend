import React, { useState, useEffect } from "react";
import "./Timer.css";
import timerIcon from "../../assets/feather/clock.svg";

const Timer = props => {
  const [seconds, setSeconds] = useState(props.startAt);
  const isActive = props.isActive;

  useEffect(() => {
    let tick = null;
    if (isActive && seconds !== 0) {
      tick = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (!isActive) {
      clearInterval(tick);
    }

    return () => clearInterval(tick);
  }, [isActive, seconds]);

  return (
    <>
      {isActive ? (
        <div className={"timer " + props.className}>
          {props.showIcon && (
            <img src={timerIcon} alt="" className="timer-icon" />
          )}
          {seconds}
        </div>
      ) : null}
    </>
  );
};

export default Timer;
