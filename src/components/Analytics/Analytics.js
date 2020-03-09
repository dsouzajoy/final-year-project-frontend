import React, { useState, useEffect, useCallback } from "react";
import "./Analytics.css";
import { Chart } from "react-google-charts";
import loadIcon from "../../assets/feather/refresh-cw.svg";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/actions";
import { axiosInstance } from "../../config/apiInstance";
import ElectionContract from "../../config/contract";
import Web3 from "web3";

const CustomLoader = () => {
  return (
    <div className="custom-loader">
      <img src={loadIcon} className="load-icon" alt="loaderIcon" />
    </div>
  );
};

const Analytics = props => {
  const dispatch = useDispatch();
  const [constituencyList, setConstituencyList] = useState([]);
  const [chosenConstituency, setChosenConstituency] = useState(
    "Udupi Chikmagalur"
  );
  const [resultList, setResultList] = useState([]);
  const [candidateList, setCandidateList] = useState([]);
  const [genderWiseVoterCount, setGenderWiseVoterCount] = useState([]);
  const [totalGenderWiseCount, setTotalGenderWiseCount] = useState([]);
  const [genderWiseVotedCount, setGenderWiseVotedCount] = useState([]);

  const handleOnChange = e => {
    setChosenConstituency(e.target.value);
  };

  const getGenderWiseVoterCount = useCallback(async () => {
    console.log("called");
    let response = await axiosInstance.get(
      `GenderwiseCountforConst/${chosenConstituency}`
    );
    if (Array.isArray(response.data.gender)) {
      setGenderWiseVoterCount(response.data.gender);
    } else {
      setGenderWiseVoterCount(
        ["Gender", "Voter Count"],
        ["Male", 0],
        ["Female", 0]
      );
    }
  }, [chosenConstituency]);

  const getTotalGenderWiseCount = async () => {
    let response = await axiosInstance.get("/totalGenderwiseCount");
    if (Array.isArray(response.data.gender)) {
      setTotalGenderWiseCount(response.data.gender);
    } else {
      setGenderWiseVoterCount(
        ["Gender", "Voter Count"],
        ["Male", 0],
        ["Female", 0]
      );
    }
  };

  const getGenderWiseVotedCount = useCallback(async () => {
    let response = await axiosInstance.get(
      `/VotedGenderwiseCountforConst/${chosenConstituency}`
    );
    setGenderWiseVotedCount(response.data.gender);
  }, [chosenConstituency]);

  const getConstituencyList = async () => {
    let response = await axiosInstance.get("getConstituency");
    setConstituencyList(response.data.names);
  };

  const getResultsForConstituency = useCallback(async () => {
    dispatch(setLoader(true));
    let response = await axiosInstance.get(
      `/candidateforconstitu/${chosenConstituency}`
    );
    let _candidateList = response.data.names;
    setCandidateList([..._candidateList]);
    let resultPromiseList = _candidateList.map(async candidate => {
      let candidateIDBytes32 = Web3.utils.asciiToHex(candidate.candidate_id);
      let vote = await ElectionContract.methods
        .getVotes(candidateIDBytes32)
        .call();
      return vote;
    });
    let results = await Promise.all(resultPromiseList);
    setResultList([...results]);
    dispatch(setLoader(false));
  }, [chosenConstituency, dispatch]);

  useEffect(() => {
    getConstituencyList();
    getTotalGenderWiseCount();
  }, []);

  useEffect(() => {
    getResultsForConstituency();
    getGenderWiseVoterCount();
    getGenderWiseVotedCount();
  }, [
    chosenConstituency,
    getGenderWiseVotedCount,
    getGenderWiseVoterCount,
    getResultsForConstituency
  ]);

  return (
    <div className="analytics">
      <div className="results-view">
        {constituencyList.length && (
          <select
            className="filter"
            onChange={handleOnChange}
            defaultValue={"Udupi Chikmagalur"}
          >
            {constituencyList.map((constituency, index) => (
              <option key={index} value={constituency}>
                {constituency}
              </option>
            ))}
          </select>
        )}
        {resultList.length && (
          <div className="reuslt-table">
            <table className="results-table" cellPadding="20px">
              <thead>
                <tr>
                  <th>CandidateID</th>
                  <th>Candidate Name</th>
                  <th>Party</th>
                  <th>Votes Received</th>
                </tr>
              </thead>
              <tbody>
                {resultList.map((result, index) => (
                  <tr key={index}>
                    <td>
                      {candidateList[index] &&
                        candidateList[index].candidate_id}
                    </td>
                    <td>
                      {candidateList[index] &&
                        candidateList[index].candidate_name}
                    </td>
                    <td>
                      {candidateList[index] && candidateList[index].party}
                    </td>
                    <td>{candidateList[index] && resultList[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="grid">
        <Chart
          className="grid-item"
          width={"400px"}
          height={"300px"}
          chartType="PieChart"
          loader={<CustomLoader />}
          data={genderWiseVoterCount}
          options={{
            title: "voters count in above constituency",
            chartArea: { width: "75%" }
          }}
          legendToggle
        />
        <Chart
          className="grid-item"
          width={"400px"}
          height={"300px"}
          chartType="PieChart"
          loader={<CustomLoader />}
          data={genderWiseVotedCount}
          options={{
            title: "Total Voted count in Above Constituency",
            chartArea: { width: "75%" }
          }}
          legendToggle
        />
        <Chart
          className="grid-item"
          width={"400px"}
          height={"300px"}
          chartType="PieChart"
          loader={<CustomLoader />}
          data={totalGenderWiseCount}
          options={{
            title: "Total Voters in All Constituency",
            chartArea: { width: "75%" }
          }}
          legendToggle
        />
        <Chart
          className="grid-item"
          width={"400px"}
          height={"300px"}
          chartType="ColumnChart"
          loader={<CustomLoader />}
          data={[
            ["City", "2010 Population", "2000 Population"],
            ["New York City, NY", 8175000, 8008000],
            ["Los Angeles, CA", 3792000, 3694000],
            ["Chicago, IL", 2695000, 2896000],
            ["Houston, TX", 2099000, 1953000],
            ["Philadelphia, PA", 1526000, 1517000]
          ]}
          options={{
            title: "Population of Largest U.S. Cities",
            chartArea: { width: "30%" },
            hAxis: {
              title: "Total Population",
              minValue: 0
            },
            vAxis: {
              title: "City"
            }
          }}
          legendToggle
        />
      </div>
    </div>
  );
};

export default Analytics;
