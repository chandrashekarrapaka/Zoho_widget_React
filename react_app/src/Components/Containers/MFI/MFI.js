import React, { useState, useEffect } from "react";
import { LoginCredentialsAndQueries } from "../../../Services/loginCredentialsAndQueries";

function MFI(prop) {
  const [accessToken, setAccessToken] = useState("");
  const [dataDisplay, setDataDisplay] = useState([]);
  const [nocomments, setNoComments] = useState(true);
  

  const currentPlant = prop.currentPlant;

  //console.log("MFI1", currentPlant[0].plantid, accessToken);

  useEffect(() => {
    const fetchDataz = async () => {
      try {
        const response = await LoginCredentialsAndQueries();
        if (response.length > 0) {
          //console.log("responseMFI", response);
          setAccessToken(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataz();
  }, [currentPlant]);

  let plantid = currentPlant[0].plantid;
  useEffect(() => {
    setDataDisplay([]);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.infinite-uptime.com/api/3.0/idap-api/service-requests?plantIds=" + plantid,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        );

        const data = await response.json();

        let key = Object.keys(data.data);
       

        const dataWithNewStatus = data.data[key].filter((ele) => ele.status === "NEW");
        dataWithNewStatus.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        setDataDisplay(dataWithNewStatus);
        setNoComments(dataWithNewStatus.length === 0);
       // console.log("mfi"+dataDisplay);
      
     
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000); // Fetch data every 30 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [currentPlant, accessToken, plantid ]);
  let i = 1;
  //const check=(new Date().getTime()-new Date(ele.serviceReqMachineDetails[0].createdDate).getTime()/3600000)<=48;
  // if(ele.status=="NEW")i++;
  // 
  //let keylength=data
  return (
    <div className="anomaly-alert">
    <p className="heading fs-16">Machine with Faults</p>
    <div className="data-box">
      <div className="data mb-2 fs-11">
        {dataDisplay && dataDisplay.length > 0 ? (
          dataDisplay.map((ele) => {
            if (ele.status === "NEW") {
              return (
                ele.serviceReqMachineDetails.map((srmd) => (
                  <div className="fs-11 mb-0 text-dark">
                    <span className="fw-bold">
                      {srmd.machineName ? i++ + ". " + srmd.machineName + " " + srmd.createdDateWithPlantTimezone : ''}
                    </span>
                    {srmd.machineServiceDetails.map((msd, index) => (
                      <ol className="data-badge mb-0" key={index}>
                        {String.fromCharCode(97 + index) + ". " + msd.serviceName}
                      </ol>
                    ))}
                  </div>
                ))
              );
            }
          })
        ) : (
          <div className="fs-11 mb-0 text-dark">No Faults observed in machines</div>
        )}
      </div>
    </div>
  </div>
  );
}

export default MFI;
