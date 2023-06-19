import React, { useState, useEffect } from "react";
import Monitor from "./Monitor";
import './Machine.css';
import {Velocity} from '../../../Services/Velocity'

function Machine(prop) {
  const [showPopup, setShowPopup] = useState(false); // State variable for pop-up visibility
  const [apiData, setApiData] = useState([]); // State variable for API data

  useEffect(() => {
    // Function to fetch API data
    const fetchData = () => {
      // Replace this with your actual API call
      // Here, we simulate a delay and set dummy data
      try {
        setTimeout(() => {
            const dummyData = [
              { id: 1, name: "Dummy Data 1" },
              { id: 2, name: "Dummy Data 2" },
              { id: 3, name: "Dummy Data 3" },
            ];
            setApiData(dummyData);
          }, 1000); // Simulating API delay of 1 second
        //     const response = await Velocity();
        //     setApiData(response);
        //     // const plantNames = response.map((ele) => ele.plantName);
        //     // setOptions(plantNames);
        //      console.log("velocity"+response);
      }
      catch(error){
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
// //  try {
//     const response = await Velocity();
//     setApiData(response);
//     // const plantNames = response.map((ele) => ele.plantName);
//     // setOptions(plantNames);
//      console.log("velocity"+response);
  const handleInfoClick = async(idz) => {
    const response =await Velocity();
           // setApiData(response);
            // const plantNames = response.map((ele) => ele.plantName);
            // setOptions(plantNames);
             //console.log("velocity"+response.machineGroups[0].id);
             const check=(value)=>{
                console.log("needy"+value.id,idz)
                if(value.id==idz)console.log("need"+value,idz)
            }//value.id==idz;
           const  valueneeded= response.machineGroups.filter(check);
           console.log("needed"+valueneeded);
    console.log("machine"+idz)
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
            <h2>API Data</h2>
            <ul>
              {apiData.map((data) => (
                <li key={data.id}>{data.name}</li>
              ))}
            </ul>
            <button className="close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Machine;
