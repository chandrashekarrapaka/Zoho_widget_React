import React, { useState, useEffect } from "react";
import Monitor from "./Monitor";
import './Machine.css';
import { Velocity } from '../../../Services/Velocity'
import Tablemini from "./Tablemini";

function Machine(prop) {
  const [showPopup, setShowPopup] = useState(false); // State variable for pop-up visibility
  const [apiData, setApiData] = useState([]); // State variable for API data

  let monitorStyle={};
  useEffect(() => {
    // Function to fetch API data
    const fetchData = async () => {
      try {
        const response = await Velocity();

        //   setApiData(response);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch API data initially
    fetchData();

    // Fetch API data every 30 seconds
    const interval = setInterval(fetchData, 30000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const getVelocity = async (id) => {

    const response = await Velocity();
    // console.log("velocityid"+id);
    response.filter((ele) => ele.id == id).map((ele) => {
      // console.log("neededid"+JSON.stringify(ele));
      setApiData(ele);
    });
  }
  const handleInfoClick = async (id) => {
    try {
      const velocityData = await Velocity();
      // console.log("velocityid" + id);
      const selectedData = velocityData.filter((ele) => ele.id === id)[0];
      setApiData(selectedData);
      setShowPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };
 
  return (
    <div className="machines">
      {prop.machine.map(function (ele) {
        const stylez={};
        let minimumValue = 5;
        ele.monitors.map((data) => {
          
        //  console.log("monitor"+elemon.healthScore)
        if (data.healthScore > 80);
                    else if (data.healthScore > 50 && data.healthScore < 80) stylez.backgroundColor = "rgb(255, 193, 7)";
                    else if (data.healthScore > 0 && data.healthScore < 50) stylez.backgroundColor = "rgb(255, 87, 34)";
                    else {
                      stylez.backgroundColor = "white";
                      stylez.border = "solid 1px";
                    }
        })
        return (
          <div className="machine" key={ele.id}>
            <div >
              <div className="textEllipsis" style={{ color: "black" }} >{ele.mg}</div>
              <h4 style={ stylez }>{ele.name}</h4>
              <div className="signals">
                <Monitor monitor={ele.monitors} />
                <h4>{ele.healthScore}%</h4>
                <div className="info-icon" onClick={() => handleInfoClick(ele.id)}>
                  &#x1F6C8;
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{apiData.name}</h2>
            <div className="tableWrapper">
              <table>
                <tr><th>Monitor Name</th><th>Axi</th><th>Ver</th><th>Hor</th><th>tem</th><th>HS</th><th>Vibration Trend</th>
                </tr>
                
                {apiData.monitors.map((data) => {
                  // console.log("table call"+data.healthScore);
                  const stylemon={"width":"auto"};
                  if (data.healthScore > 80);
                  else if (data.healthScore > 50 && data.healthScore < 80) stylemon.backgroundColor = "rgb(255, 193, 7)";
                  else if (data.healthScore > 0 && data.healthScore < 50) stylemon.backgroundColor = "rgb(255, 87, 34)";
                  else {
                    stylemon.backgroundColor = "white";
                    stylemon.border = "solid 1px";
                  }
                  
               
                  return(
                    <Tablemini data={data} stylz={stylemon}/>
                  );
  })}

              </table>
            </div>
            <center><a href="https://idap.infinite-uptime.com/#/dashboard/MonitoringTable" target="_blank" rel="noopener noreferrer">For Detailed Analysis Click Here!</a></center>
            <b>Observation</b> :{apiData.observation}<br></br><br></br>
            <b>Diagnostic</b> :{apiData.diagnostic}<br></br><br></br>
            <b>Recommendation</b> :{apiData.recommendation}<br></br><br></br>

            <button className="close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Machine;
