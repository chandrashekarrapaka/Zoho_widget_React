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

    
       <div className="cement-mill-sec">
              <div className="cement-mill-wrapper">
                <div className="row">
      {prop.machine.map(function (ele) {
        const stylez = {};
        let grayshade=[];
        let minimumValue = 0;
        ele.monitors.map((data) => {
           // console.log("statusvalue"+data.status,minimumValue)
          grayshade.push(data.status);
          if (data.status >= minimumValue) minimumValue = data.status;
          if (minimumValue == 1 || minimumValue == 2) stylez.backgroundColor = "#64DD17";
          else if (minimumValue == 3) stylez.backgroundColor = "#FFC107";
          else if (minimumValue == 4) stylez.backgroundColor = "#FF5722";
          // else if (minimumValue == 5 && (grayshade%5)==0){
          //  console.log("grayshade"+grayshade);
          //   stylez.backgroundColor = "#9E9E9E";
          // }
         
        })
        const allEqual = arr => arr.every(val => {
          return val === 5 ||val == undefined
        });
        const result=allEqual(grayshade);
        if(result)stylez.backgroundColor = "#9E9E9E";
       // console.log(grayshade,result);
        return (
         

           

                  <div className="col-lg col-20 mb-2" >
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
                        <div className="box-footer d-flex justify-content-between" style={stylez} onClick={() => handleInfoClick(ele.id)}>
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
                
          
        );
      })}
       {showPopup && (
        <div className="popup"  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel"><center>{apiData.name}</center></h4>
            </div>
            <div className="modal-body">
            <div className="table-responsive custom-content-table" style={{height:"300px"}}>
  <table className="table">
    <thead>
      <tr>
        <th scope="col">Monitor<br/>Name</th>
        <th scope="col">Axial</th>
        <th scope="col">Vertical</th>
        <th scope="col">Horizontal</th>
        <th scope="col">Temperature</th>
        <th scope="col">Health<br/>Score</th>
        <th scope="col">Vibration<br/>Trend</th>
      </tr>
    </thead>
    <tbody>
                {apiData.monitors.map((data) => {
                  // console.log("table call"+data.healthScore);
                  const stylemon = { "width": "auto",scope:"row" };
                  
                  
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

</tbody>
  </table>
</div>
	    
	   
	   <div className="modal-bottom-content">
           
            {/* <center>For Detailed Analysis Click Here!</a></center> */}
            <p><strong>Observation</strong>: {apiData.observation}</p>
            <p><strong>Diagnostic</strong>: {apiData.diagnostic}</p>
            <p><strong>Recommendation</strong>: {apiData.recommendation}</p>
            </div>
            </div>
            <div className="modal-footer" style={{display:"flex",justifyContent:"space-between"}}>
        <button type="button" className="btn btn-sm btn-secondary fw-bold shadow"  onClick={closePopup}>Close</button>
       <button
  type="button"
  className="btn btn-sm click-here-btn fw-bold shadow"
  onClick={() =>
    window.open(
      "https://idap.infinite-uptime.com/#/dashboard/MonitoringTable",
      "_blank"
    )
  }
>
  For Detailed Analysis Click Here!
</button>
      </div>
            
      </div>
  </div>
</div>
      )}
     
    </div>
    </div>
              </div>
            
  );
}

export default Machine;
