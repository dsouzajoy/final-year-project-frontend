import React, { useState, useEffect } from "react";
import "./VoteView.css";
import getTranslatedText from "../../translations";
import { useSelector, useDispatch } from "react-redux";
import fingerPrint from "../../assets/login.svg";
import { axiosInstance } from "../../config/apiInstance";
import { setLoader } from "../../redux/actions";
import PopUp from "../PopUp";
import Timer from "../Timer";
import translateIcon from "../../assets/translate.png";
import LanguageSelector from "../LanguageSelector";
import checkIcon from "../../assets/feather/check-circle.svg";
import userIcon from "../../assets/feather/user.svg";
import errorIcon from "../../assets/feather/alert-circle.svg";
import ElectionContract, { web3 } from "../../config/contract";
import Web3 from "web3";

const VoteView = () => {
  const dispatch = useDispatch();
  const [voterID, setVoterID] = useState("");
  const [showCandidateList, setShowCandidateList] = useState(false);
  const [buttonDisability, setButtonDisability] = useState(true);
  const [candidateList, setCandidateList] = useState([]);
  const [showLanguagePopUp, setShowLanguagePopUp] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);
  const [showConfirmationPopUp, setShowConfirmationPopUp] = useState(false);
  const [isVoterIDValid, setIsVoterIDValid] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [voterName, setVoterName] = useState("");
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  const languageCode = useSelector(state => state.common.languageCode);

  const handleOnChange = e => {
    let value = e.target.value;
    if (!(value.length > 10)) {
      value = value.toUpperCase();
      setVoterID(value);
    }
  };

  const cleanUpAndQuit = () => {
    setTimeout(() => {
      setShowErrorPopUp(false);
      setShowConfirmationPopUp(false);
      setShowCandidateList(false);
      setIsTimerActive(false);
    }, 5000);
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    dispatch(setLoader(true));
    let response = await axiosInstance.get(`/getCandidateDetails/${voterID}`);
    setCandidateList(response.data.details);
    setVoterName(response.data.name.toLowerCase());
    setButtonDisability(false);
    setShowCandidateList(true);
    dispatch(setLoader(false));
  };

  const getAccounts = async () => {
    let accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const castVote = async candidateID => {
    setButtonDisability(true);
    let candidateIDBytes32 = Web3.utils.asciiToHex(candidateID);
    let voterIDBytes32 = Web3.utils.asciiToHex(voterID);
    try {
      await ElectionContract.methods
        .vote(candidateIDBytes32, voterIDBytes32)
        .send({ from: account });
      updateAnalytics();
      setShowConfirmationPopUp(true);
      setIsTimerActive(true);
    } catch (error) {
      setError("alreadyVotedError");
      setShowErrorPopUp(true);
    }
    cleanUpAndQuit();
  };

  const updateAnalytics = async () => {
    let response = await axiosInstance.get(`UpdateAnalytics/${voterID}`);
    console.log(response);
  };

  useEffect(() => {
    getAccounts();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (voterID.length === 10) {
      setIsVoterIDValid(true);
    } else {
      setIsVoterIDValid(false);
    }
  }, [voterID]);

  return (
    <div className="vote-view">
      <button
        className="translate-button"
        onClick={() => {
          setShowLanguagePopUp(true);
        }}
      >
        <img src={translateIcon} alt="-" />
        {getTranslatedText(languageCode, "changeLanguage")}
      </button>
      {showCandidateList ? (
        <>
          {voterName.length && (
            <div className="voter-name">
              <img src={userIcon} className="user-icon" alt="user-icon" />
              <span>{voterName}</span>
            </div>
          )}
          <div className="vote-candidates-container">
            {candidateList.map((candidate, index) => (
              <div key={index} className="vote-candidates-item">
                <span className="vote-candidates-name flex-item-3">
                  {candidate.candidate_name}
                </span>
                <div className="flex-item-1">
                  <img
                    className="vote-candidates-image"
                    src={`/assets/img/${candidate.party_logo}`}
                    alt="party-logo"
                  />
                </div>
                <div className="flex-item-1">
                  <button
                    className="button vote-candidates-button"
                    onClick={() => {
                      castVote(candidate.candidate_id);
                    }}
                    disabled={buttonDisability}
                  >
                    {getTranslatedText(languageCode, "vote")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleOnSubmit} className="form vote-form">
            <input
              type="text"
              value={voterID}
              onChange={handleOnChange}
              className="input vote-input-field"
              placeholder={getTranslatedText(
                languageCode,
                "voterIDPlaceholder"
              )}
            />
            <button
              type="submit"
              className="button vote-button"
              disabled={!isVoterIDValid}
            >
              {getTranslatedText(languageCode, "continue")}
            </button>
          </form>
          <div className="scanner-outer">
            <div className="scanner-line"></div>
            <div className="scanner-inner">
              <img src={fingerPrint} alt="fingerPrint" />
            </div>
          </div>
        </>
      )}
      {showLanguagePopUp && (
        <LanguageSelector
          closePopUp={() => {
            setShowLanguagePopUp(false);
          }}
        />
      )}
      {showConfirmationPopUp && (
        <PopUp
          closePopUp={() => {
            setShowConfirmationPopUp(false);
          }}
        >
          <div className="vote-confirmation-view">
            <Timer
              isActive={isTimerActive}
              startAt={5}
              className="vote-confirmation-timer"
              showIcon={true}
            />
            <img src={checkIcon} alt="checkIcon" className="success-icon" />
            <span>
              {getTranslatedText(languageCode, "voteConfirmationMessage")}
            </span>
          </div>
        </PopUp>
      )}
      {showErrorPopUp && (
        <PopUp closePopUp={() => setShowErrorPopUp(false)}>
          <div className="vote-error-popup">
            <img src={errorIcon} alt="errorIcon" className="error-icon" />
            <span>{getTranslatedText(languageCode, error)}</span>
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default VoteView;
