import React, { useState, useEffect } from "react";
import Monitor from "./Monitor";
import './Machine.css';
import { Velocity } from '../../../Services/Velocity'
import Tablemini from "./Tablemini";
import icon1 from '../../../assets/imgs/cement-box-icon-1.png';
import icon2 from '../../../assets/imgs/cement-box-icon-2.png';


function Machine(prop) {
  const [showPopup, setShowPopup] = useState(false); // State variable for pop-up visibility
  const [apiData, setApiData] = useState([]); // State variable for API data

  let monitorStyle = {};
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
        const stylez = {};
        let minimumValue = 5;
        ele.monitors.map((data) => {

          //  console.log("monitor"+elemon.healthScore)
          if (data.status < minimumValue) minimumValue = data.status;
          if (data.status == 1 || data.status == 2) stylez.backgroundColor = "#64DD17";
          else if (data.status == 3) stylez.backgroundColor = "#FFC107";
          else if (data.status == 4) stylez.backgroundColor = "#FF5722";
          else {
            stylez.backgroundColor = "#9E9E9E";
          }
        })
        return (
         

            <div className="cement-mill-sec">
              <div className="cement-mill-wrapper">
                <div className="row">

                  <div className="col-lg mb-3 col-md-4 col-sm-6" >
                    <div className="cement-mill-box " style={{"padding":"2px"}}>
                      <p className="heading text-white mb-0 fw-bold fs-14 text-center">
                      {ele.mg}
                      </p>
                      <p className="text-dark fs-14 mb-0 fw-bold text-center p-1">
                      {ele.name}
                      </p>
                      <div className="color-boxes">
                        <div className="box-wrapper pb-3">
                          <Monitor monitor={ele.monitors} />
                        </div>
                        <div className="box-footer d-flex justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="icon mb-0">
                              <img src={icon1} alt="Secure Icon" className="img-fluid" />
                            </div>
                            <p className="fs-14 mt-1 text-black fw-bold mb-0">
                              {ele.healthScore}%
                            </p>
                          </div>
                          <div className="i-icon" onClick={() => handleInfoClick(ele.id)}>
                            <img src={icon2} alt="I icon" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
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
                  const stylemon = { "width": "auto" };
                  if (data.status == 1 || data.status == 2) stylemon.backgroundColor = "#64DD17";
                  else if (data.status == 3) stylemon.backgroundColor = "#FFC107";
                  else if (data.status == 4) stylemon.backgroundColor = "#FF5722";
                  else {
                    stylemon.backgroundColor = "#9E9E9E";
                  }


                  return (
                    <Tablemini data={data} stylz={stylemon} />
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
