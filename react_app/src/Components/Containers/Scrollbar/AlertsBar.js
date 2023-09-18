import React, { useState, useEffect } from "react";
import { LoginCredentialsAndQueries } from "../../../Services/loginCredentialsAndQueries";


const AlertsBar = ( prop) => {

    const [accessToken, setAccessToken] = useState("");
  const [dataDisplay, setDataDisplay] = useState();

  const currentPlant = prop.currentPlant;
  //console.log("AA1", currentPlant[0].plantid, accessToken);

  useEffect(() => {
    const fetchDataz = async () => {
      try {
        const response = await LoginCredentialsAndQueries();
        if (response.length > 0) {
          //console.log("responseAA", response);
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
      let now = new Date();
      let dtTo = now.toISOString().replace(/\.\d+Z$/, "Z").replace(/:/g, "%3A");
      let dtFrom = new Date(now.getTime() - 48 * 60 * 60 * 1000)
        .toISOString()
        .replace(/\.\d+Z$/, "Z")
        .replace(/:/g, "%3A");

      try {
        const response = await fetch(
          "https://api.infinite-uptime.com/api/3.0/idap-api/anomaly-alerts?plantIds=" +
          plantid +
          "&from=" +
          dtFrom +
          "&to=" +
          dtTo,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        );

        const data = await response.json();
        setDataDisplay(data);
        //console.log("alerts", JSON.stringify(data.data.length));
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
  //console.log("data"+JSON.stringify(dataDisplay));
  let lengthofDisplay = dataDisplay && dataDisplay.data.length == 0;



  // console.log("checking",lengthofDisplay,dataDisplay.data.length)
    const handleMouseEnter = () => {
      // Stop scrolling when the mouse enters the marquee
      const marquee = document.querySelector(".alerts-marquee");
      if (marquee) {
        marquee.stop();
      }
    };
  
    const handleMouseLeave = () => {
      // Resume scrolling when the mouse leaves the marquee
      const marquee = document.querySelector(".alerts-marquee");
      if (marquee) {
        marquee.start();
      }
    };
    function parseCustomDate(dateString) {
        const parts = dateString.match(/(\d+).([A-Za-z]+).(\d+) (\d+):(\d+):(\d+)/);
      
        if (!parts) {
          // Invalid date format
          return null;
        }
      
        const [, day, monthName, year, hours, minutes, seconds] = parts;
      
        const monthAbbreviations = {
          'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
          'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };
      
        const month = monthAbbreviations[monthName];
      
        if (month === undefined) {
          // Invalid month abbreviation
          return null;
        }
      
        return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
      }
    const check24=(timeStamp)=>{
        const dateString = parseCustomDate(timeStamp);
        const date = new Date(dateString);
        const currentDate = new Date();
        const timeDifference = currentDate - date;
        const hoursDifference = timeDifference / (1000 * 60 * 60);
       // console.log(dateString,date,hoursDifference);
        if (hoursDifference <= 24) {
          return true;
        } else {
          return false;
        }  
    }
    return (
      <div className="alerts-bar" style={{ background: "#FFC107" }}>
        <marquee className="alerts-marquee" behavior="scroll" direction="left" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
         
        {dataDisplay && dataDisplay.data.length > 0 ? ( 
  dataDisplay.data.map((ele) => (
    <>
      {check24(ele.alertTimestamp) ? (
        <> New Fault identified: Machine : </>
      ) : (
        <> New Anomaly Alert Generated: Machine : </>
      )}
      <span className="fw-bold"> <a href="https://idap.infinite-uptime.com/#/dashboard/MonitoringTable">{ele.machineName}</a></span> |
    </>
  ))
) : (
  lengthofDisplay ? (
    <>No Anomaly Alert in Last 48 Hours</>
  ) : (
    <>No Anomaly Alert in Last 48 Hours</>
  )
)}
        </marquee>
      </div>
    );
  };
  

export default AlertsBar;