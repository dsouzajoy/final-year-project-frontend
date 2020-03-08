import React, { useState } from "react";
import "./LanguageSelector.css";
import PopUp from "../PopUp";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/actions";
import getTranslatedText, { langList } from "../../translations";
import closeIcon from "../../assets/feather/x.svg";

const LanguageSelector = props => {
  const dispatch = useDispatch();
  const languageCode = useSelector(state => state.common.languageCode);
  const [chosenLangISO, setChosenLangISO] = useState(languageCode);

  const handleOnChange = e => {
    setChosenLangISO(e.target.value);
  };

  const handleOnClick = e => {
    dispatch(setLanguage(chosenLangISO));
    props.closePopUp();
  };

  return (
    <PopUp closePopUp={props.closePopUp}>
        <img src={closeIcon} alt="close" className="language-selector-close" onClick={props.closePopUp}/>
      {langList.map((language, index) => (
        <div className="language-card" key={index}>
          <label htmlFor={language.iso} className="custom-radio">
            <input
              type="radio"
              onChange={handleOnChange}
              value={language.iso}
              id={language.iso}
              name="language-radio"
              checked={chosenLangISO === language.iso}
            />
            <span>{language.name}</span>
          </label>
        </div>
      ))}
      <button
        className="button"
        onClick={handleOnClick}
        disabled={chosenLangISO === languageCode}
      >
        {getTranslatedText(languageCode, "continue")}
      </button>
    </PopUp>
  );
};

export default LanguageSelector;
