import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Velocity } from "../../../Services/Velocity";

function Machine(prop) {
  const [showPopup, setShowPopup] = useState(false);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Velocity();
        setApiData(response); // Update state with API data
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    // Fetch API data every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  const getChartData = () => {
    const machines = prop.machine.length;
    const monitors = prop.machine.reduce((acc, ele) => acc + ele.monitors.length, 0);

    const healthScores = prop.machine
      .flatMap((ele) => ele.monitors.map((monitor) => monitor.healthScore))
      .filter((healthScore) => healthScore !== undefined);
    console.log(healthScores);
    const healthScorePercentages = [
      healthScores.filter((score) => score < 100).length,
      healthScores.filter((score) => score < 75).length,
      healthScores.filter((score) => score <50).length,
      healthScores.filter((score) => score < 25).length,
    ];

    const chartData = {
      labels: ['Healthy', 'Warning', 'Critical', 'Undefined'],
      datasets: [
        {
          data: healthScorePercentages,
          backgroundColor: ['#64DD17', '#FFC107', '#FF5722', '#9E9E9E'],
        },
      ],
    };
    console.log(chartData);
    return chartData;
  };

  return (
    <div className="cement-mill-sec">
      <div className="cement-mill-wrapper">
        <div className="row">
          <Doughnut data={getChartData()} />
          {showPopup && (
            <div
              className="popup"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              {/* ... Popup content ... */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Machine;
