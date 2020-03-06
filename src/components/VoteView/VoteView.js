import React, { useState } from "react";
import "./VoteView.css";
import fallbackList from "../../fallback/candidates.json";
import getTranslatedText from "../../translations";
import { useSelector } from "react-redux";
import fingerPrint from "../../assets/login.svg";
import { axiosInstance } from "../../config/apiInstance";

const VoteView = () => {
  const [voterID, setVoterID] = useState("");
  const [showCandidateList, setShowCandidateList] = useState(false);
  const [buttonDisability, setButtonDisability] = useState(true);
  const [candidateList, setCandidateList] = useState([]);
  const languageCode = useSelector(state => state.language.code);

  const handleOnChange = e => {
    setVoterID(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let response = await axiosInstance.get(`/getCandidateDetails/${voterID}`);
    setCandidateList(response.data.details);
    setButtonDisability(false);
    setShowCandidateList(true);
  };

  const castVote = candidateID => {
    console.log(candidateID);
    setButtonDisability(true);
    setTimeout(() => setShowCandidateList(false), 5000);
  };

  return (
    <div className="vote-view">
      {showCandidateList ? (
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
      ) : (
          <>
        <form onSubmit={handleOnSubmit} className="form vote-form">
          <input
            type="text"
            value={voterID}
            onChange={handleOnChange}
            className="input vote-input-field"
            placeholder={getTranslatedText(languageCode, "voterIDPlaceholder")}
          />
          <button type="submit" className="button vote-button">
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
    </div>
  );
};

export default VoteView;
