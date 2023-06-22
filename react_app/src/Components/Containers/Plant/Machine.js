import React, { useState, useEffect } from "react";
import Monitor from "./Monitor";
import './Machine.css';
import {Velocity} from '../../../Services/Velocity'

function Machine(prop) {
  const [showPopup, setShowPopup] = useState(false); // State variable for pop-up visibility
  const [apiData, setApiData] = useState([]); // State variable for API data

  //yellowColor = "rgb(255, 193, 7)";
  // redColor = "";
  // greenColor = "";

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

  const getVelocity=async(id)=>{
    
    const response = await Velocity();
    console.log("velocityid"+id);
    response.filter((ele)=>ele.id==id).map((ele)=>{
        console.log("neededid"+JSON.stringify(ele));
         setApiData(ele);
    });
  }
  const handleInfoClick = async(id) => {
   const getVelocit=await getVelocity(id);

   
    console.log("machineid"+id)
    setShowPopup(true);
    
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="machines">
      {prop.machine.map(function (ele) {
        return (
          <div className="machine" key={ele.id}>
            <div >
              <h4 style={{ color: "black", backgroundColor:"rgb(255, 193, 7)" }}>{ele.name}</h4>
              <div className="signals">
                <Monitor monitor={ele.monitors} />
                <h4>HS {ele.healthScore}</h4>
                <div className="info-icon"  onClick={() => handleInfoClick(ele.id)}>
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
            <table>
            <tr><th>Name</th><th>velocityX</th><th>velocityY</th><th>velocityZ</th><th>temperature</th><th>healthScore</th><th>trend</th>
            </tr>
              {apiData.monitors.map((data) => (
                <tr key={data.id}>
                  <td>${data.name}</td><td>${data.velocityX}</td><td>${data.velocityY}</td><td>${data.velocityZ}</td><td>${data.temperature}</td><td>${data.healthScore}</td><td>${data.trend}</td></tr>
              ))}
            </table>
            <ul>
              <li>Observation :${apiData.observation}</li>
              <li>Diagnostic :${apiData.diagnostic}</li>
              <li>Recommendation :${apiData.recommendation}</li>
            </ul>
            <button className="close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Machine;
