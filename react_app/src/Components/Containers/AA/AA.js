import React, { useState, useEffect } from "react";
import "./AA.css";
import { LoginCredentialsAndQueries } from "../../../Services/loginCredentialsAndQueries";

function AA(prop) {
  const [accessToken, setAccessToken] = useState("");
  const [dataDisplay, setDataDisplay] = useState();

  const currentPlant = prop.currentPlant;
  console.log("AA1", currentPlant[0].plantid, accessToken);

  useEffect(() => {
    const fetchDataz = async () => {
      try {
        const response = await LoginCredentialsAndQueries();
        if (response.length > 0) {
          console.log("responseAA", response);
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
          "https://api-idap.infinite-uptime.com/api/3.0/idap-api/anomaly-alerts?plantIds=" +
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
        console.log("alerts", JSON.stringify(data));
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

  return (
    <div className="content-box">
      <div className="head">Anomaly Alert</div>
      <div className="content-container">
        {dataDisplay && dataDisplay.data ? (
          dataDisplay.data.map((ele) => (
            <div className="content-item">
              <div className="machine-name">Machine Name: {ele.machineName}</div>
              <div className="monitor-name">Monitor Name: {ele.monitorName}</div>
              <div className="anomaly-magnitude">Anomaly Magnitude: {ele.anomalyMagnitude}</div>
              <div className="alert-timestamp">Alert Timestamp: {ele.alertTimestamp}</div>
              <div className="anomaly-detected">Anomaly Detected: {ele.anomalyDetected}</div>
            </div>
          ))
        ) : (
          <>Loading....</>
        )}
      </div>
    </div>
  );
}

export default AA;
