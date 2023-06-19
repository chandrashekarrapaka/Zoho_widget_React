import React, { useState, useEffect } from "react";
import Monitor from "./Monitor";
import './Machine.css';
import {Velocity} from '../../../Services/Velocity'

function Machine(prop) {
  const [showPopup, setShowPopup] = useState(false); // State variable for pop-up visibility
  const [apiData, setApiData] = useState([]); // State variable for API data

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
            <div
              style={{
                border: "2px solid yellow",
                borderRadius: "10px",
                margin: "5px",
                padding: "5px"
              }}
            >
              <h4 style={{ color: "black" }}>{ele.name}</h4>
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
            <li ><u>{`Name  velocityX  velocityY   velocityZ  temperature healthScore trend`}</u></li>
            <ul style={{backgroundColor:"gray",height:"70px",overflow:"auto"}}>
            
              {apiData.monitors.map((data) => (
                <li key={data.id}>{`${data.name}  ${data.velocityX}  ${data.velocityY}   ${data.velocityZ}  ${data.temperature}  ${data.healthScore} ${data.trend}`}</li>
              ))}
            </ul>
            <div>{`Observation :${apiData.observation} \n
            Diagnostic :${apiData.diagnostic} \n
            Recommendation :${apiData.recommendation}\n`}</div>
            <button className="close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Machine;
