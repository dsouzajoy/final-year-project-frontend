import React, { useState } from "react";
import "./Login.css";
import authIcon from "../../assets/login.svg";
import getTranslatedText from "../../translations";
import { useSelector } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const languageCode = useSelector(state => state.language.code);

  const handleOnChange = e => {
    e.currentTarget.name === "username"
      ? setUsername(e.target.value)
      : e.currentTarget.name === "password" && setPassword(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <div className="login">
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
    </div>
  );
};

export default Login;
