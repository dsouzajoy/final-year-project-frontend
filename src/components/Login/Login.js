import React, { useState } from "react";
import "./Login.css";
import authIcon from "../../assets/login.svg";
import getTranslatedText from "../../translations";
import { useSelector, useDispatch } from "react-redux";
import translateIcon from "../../assets/translate.png";
import LanguageSelector from "../LanguageSelector";
import { setCommissionerAuth } from "../../redux/actions";
import PopUp from "../PopUp";
import errorIcon from "../../assets/feather/alert-circle.svg";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [showLanguagePopUp, setShowLanguagePopUp] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);
  const [error, setError] = useState("");
  const languageCode = useSelector(state => state.common.languageCode);

  const handleOnChange = e => {
    e.currentTarget.name === "username"
      ? setUsername(e.target.value)
      : e.currentTarget.name === "password" && setPassword(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    if(username === "superadmin" && password === "myWeakPassword"){
      dispatch(setCommissionerAuth(true));
      props.history.replace("/admin");
    }else{
      setError("invalidLoginCredentials");
      setShowErrorPopUp(true);
    }
  };

  return (
    <div className="login">
      <button
        className="translate-button"
        onClick={() => {
          setShowLanguagePopUp(true);
        }}
      >
        <img src={translateIcon} alt="-" />
        {getTranslatedText(languageCode, "changeLanguage")}
      </button>
      <div className="login-text">
        {getTranslatedText(languageCode, "adminWelcomeText")}
        <br />
        <div>{getTranslatedText(languageCode, "adminWelcomeSubText")}</div>
      </div>
      <form className="form login-form" onSubmit={handleOnSubmit}>
        <img src={authIcon} alt="login-img" className="login-icon" />

        <input
          type="text"
          className="input login-input-field mb10"
          name="username"
          id="username"
          onChange={handleOnChange}
          placeholder={getTranslatedText(languageCode, "usernamePlaceholder")}
          autoComplete="off"
        />

        <input
          type="password"
          className="input login-input-field mb10"
          name="password"
          id="password"
          onChange={handleOnChange}
          placeholder={getTranslatedText(languageCode, "passwordPlaceholder")}
          autoComplete="off"
        />

        <button type="submit" className="button login-button">
          {getTranslatedText(languageCode, "login")}
        </button>
      </form>
      {showLanguagePopUp && (
        <LanguageSelector
          closePopUp={() => {
            setShowLanguagePopUp(false);
          }}
        />
      )}
      {
        showErrorPopUp && 
        <PopUp closePopUp={() => setShowErrorPopUp(false)}>
          <div className="vote-error-popup">
            <img src={errorIcon} alt="errorIcon" className="error-icon"/>
            <span>
            {getTranslatedText(languageCode, error)}
            </span>
          </div>
        </PopUp>
      }
    </div>
  );
};

export default Login;
