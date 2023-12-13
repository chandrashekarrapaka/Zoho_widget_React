import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Velocity } from "../../../Services/Velocity";

function Machine(prop) {
  const [showPopup, setShowPopup] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [board,setBoard]=useState(true);//insta=true
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

  useEffect(() => {
    console.log("chandu");
   
    setBoard(!board);
  }, [prop.board]);
  const getChartData = (machine) => {
    // const monitors = machine.monitors.length;
    //console.log(machine.monitors);
    
    const healthScores = machine.monitors
    .map((monitor) => monitor.status)
    .filter((healthScore) => healthScore !== undefined);

    const healthScorePercentages = [
      healthScores.filter((score) => score == 5 ).length,
      healthScores.filter((score) => score == 4).length,
      healthScores.filter((score) => score == 3).length,
      healthScores.filter((score) => score == 2 ||score == 1).length,
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
  const getChartData2 = (machine) => {
    // const monitors = machine.monitors.length;

    //console.log(machine.monitors);
      const healthScores = machine.monitors
      .map((monitor) => monitor.healthScore)
      .filter((healthScore) => healthScore !== undefined);

    const healthScorePercentages = [
      healthScores.filter((score) => score <= 100 &&score > 80).length,
      healthScores.filter((score) => score <=80  &&score > 50).length,
      healthScores.filter((score) => score <=50  &&score > 0).length,
      healthScores.filter((score) => score == 0).length,
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
              
             {board? <Pie data={getChartData(machine)} width={200}   height={200} options={{
                maintainAspectRatio: false,
                responsive: false,
                
                
              }} />:<Pie data={getChartData2(machine)} width={200}   height={200} options={{
                maintainAspectRatio: false,
                responsive: false,
                
                
              }} />}
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
