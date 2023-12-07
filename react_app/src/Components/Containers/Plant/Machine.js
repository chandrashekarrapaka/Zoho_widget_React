import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
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

  const getChartData = (machine) => {
    const monitors = machine.monitors.length;

    const healthScores = machine.monitors
      .map((monitor) => monitor.healthScore)
      .filter((healthScore) => healthScore !== undefined);

    const healthScorePercentages = [
      healthScores.filter((score) => score < 100).length,
      healthScores.filter((score) => score < 75).length,
      healthScores.filter((score) => score < 50).length,
      healthScores.filter((score) => score < 25).length,
    ];

    return {
      // labels: ['Healthy', 'Warning', 'Critical', 'Undefined'],
      datasets: [
        {
          data: healthScorePercentages,
          backgroundColor: ['#64DD17', '#FFC107', '#FF5722', '#9E9E9E'],
        },
      ],
      options: {
        legend: {
          display: false,
        },
      },
    };
  };

  return (
    <div className="cement-mill-sec" >
      <div className="cement-mill-wrapper">
        <div className="row">
          {prop.machine.map((machine, index) => (
            
            <div key={index} className="col-lg col-20 mb-1">
              <div style={{fontWeight:"bold"}}>{machine.name}</div>
              <Pie data={getChartData(machine)} width={200}   height={200} options={{
                maintainAspectRatio: false,
                responsive: false,
                
                
              }} />
              <div>{"Health Score: "+machine.healthScore}<br/>{"Status: "+machine.status}<br/>{"MG: "+machine.mg}</div>
              {/* {console.log(machine)} */}
            </div>
          ))}
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
