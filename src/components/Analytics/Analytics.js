import React from "react";
import "./Analytics.css";
import { Chart } from "react-google-charts";
import loadIcon from "../../assets/feather/refresh-cw.svg";

const CustomLoader = () => {
  return (
    <div className="custom-loader">
      <img src={loadIcon} className="load-icon" alt="loaderIcon" />
    </div>
  );
};

const Analytics = props => {
  return (
    <div className="analytics">
      <div className="grid">
        <Chart
          className="m20"
          width={400}
          height={300}
          chartType="PieChart"
          loader={<CustomLoader />}
          data={[
            ["Gender", "Voter Count"],
            ["Male", 8175000],
            ["Female", 8175000]
          ]}
          options={{
            title: "Voting Count Details",
            chartArea: { width: "75%" },
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
        <Chart
          className="m20"
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
        <Chart
          className="m20"
          width={400}
          height={300}
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
        <Chart
          className="m20"
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
        <Chart
          className="m20"
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
