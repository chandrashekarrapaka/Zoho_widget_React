import React, { useState, useEffect } from "react";
import { LoginCredentialsAndQueries } from "../../../Services/loginCredentialsAndQueries";

function AA(prop) {
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
          "https://api.infinite-uptime.com/api/3.0/idap-api/anomaly-alerts/plants?plantIds=" +
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
  return (
    <div className="anomaly-alert">
      <p className="heading fs-16">Anomaly Alert</p>
      <div className="data-box">
      <div class="data mb-2 fs-11">
        {dataDisplay && dataDisplay.data.length > 0 ? (
          dataDisplay.data.map((ele) => (
            <div className="content-itemz">
              <div className="fs-11 mb-0 text-dark">Machine Name: 
             <span className="fw-bold"> {ele.machineName}</span>
              </div>
              <div className="data-badge fs-11 mb-0">Monitor Name: {ele.monitorName}</div>
              <div className="anomaly-magnitude fs-11">Anomaly Magnitude: {ele.anomalyMagnitude}</div>
              <div className="alert-timestamp fs-11">Alert Timestamp: {ele.alertTimestamp}</div>
              <div className="anomaly-detected fs-11">Anomaly Detected: {ele.anomalyDetected}</div>
            </div>
          ))
        ) :
          ({ lengthofDisplay } ? (<>No Anomaly Alert in Last 48 Hours</>) : (<>No Anomaly Alert in Last 48 Hours</>))}
      </div>
      </div>
    </div>
  );
}

export default AA;
