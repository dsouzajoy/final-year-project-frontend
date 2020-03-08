import React, { useEffect } from "react";
import "./PopUp.css";

const PopUp = props => {
  const handleOutsideClick = e => {
    const innerElement = document.getElementById("popup-inner");
    innerElement && !innerElement.contains(e.target) && props.closePopUp();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); //eslint-disable-line

  return (
    <div className="popup-outer">
      <div className="popup-inner" id="popup-inner">{props.children}</div>
    </div>
  );
};

export default PopUp;
