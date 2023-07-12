import React, { useState, useEffect } from "react";
import './MFI.css';
import { LoginCredentialsAndQueries } from "../../../Services/loginCredentialsAndQueries";

function MFI(prop) {
  const [accessToken, setAccessToken] = useState("");
  const [dataDisplay, setDataDisplay] = useState();

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
  }, []);

  let plantid = currentPlant[0].plantid;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-idap.infinite-uptime.com/api/3.0/idap-api/service-requests?plantIds=" + plantid,
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
       
        setDataDisplay(data.data[key]);
        //console.log("mfi"+dataDisplay);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000); // Fetch data every 30 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [currentPlant, accessToken]);
  let i = 1;
  //const check=(new Date().getTime()-new Date(ele.serviceReqMachineDetails[0].createdDate).getTime()/3600000)<=48;
  // if(ele.status=="NEW")i++;
  // 
  //let keylength=data
  return (
    <div className="content-box">
      <div className="head">Machine with Faults</div>
      <div className="content-container">
        {dataDisplay ? (
          dataDisplay.map((ele) => {
            {if(ele.status=="NEW")
            return(
            ele.serviceReqMachineDetails.map((srmd) => {
              
              return(
              <div className="machine-name">
                
                {srmd.machineName ?i+++"."+" "+ srmd.machineName + " " + srmd.createdDate : ''}
                {srmd.machineServiceDetails.map((msd,index) => {
                  return (
                    <ol className="monitor-name">
                      {String.fromCharCode(97+index)+". "+msd.serviceName}
                    </ol>
                  );

                })}
              </div>
              
              )
            })
          )
          else
          return(
            <>No Faults observed in machines </>
          )
            }

          })
        ) : ({dataDisplay}?(<>No Data Available</>):(<>No Faults observed in machines </>)
          
        )}
      </div>
    </div>
  );
}

export default MFI;
