import React, { useState, useEffect } from "react";
import { LoginCredentialsAndQueries } from "../../../Services/loginCredentialsAndQueries";
import './AlertsBar.css';

const AlertsBar = ( prop) => {

    const [accessToken, setAccessToken] = useState("");
  const [dataDisplay, setDataDisplay] = useState();
  const [totalAlerts,setTotalAlerts ] = useState([]);
  const [animationDuration,setAnimationDuration]=useState(30);
  const [animationPaused,setAnimationPaused]=useState(false);
  let contentLength = 0;


  const totalPlants=prop.plantsData;
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
  }, [prop.currentPlant]);

  //let plantid = currentPlant[0].plantid;
  useEffect(() => {
    const fetchData = async () => {
      let now = new Date();
      let dtTo = now.toISOString().replace(/\.\d+Z$/, "Z").replace(/:/g, "%3A");
      let dtFrom = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        .toISOString()
        .replace(/\.\d+Z$/, "Z")
        .replace(/:/g, "%3A");

      try {
        const fetchPromises = totalPlants.map(async (element) => {
          //console.log()
          const plantid = element[0].plantid;
          //console.log("id"+plantid);
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
          if (response.ok) {
            const data = await response.json();
            // console.log("datacheck1"+data.data.length);
           // console.log("datacheck1"+data.data.length);
            if (data && data.data.length > 0) {

            const response2 = await fetch(
              "https://api.infinite-uptime.com/api/3.0/idap-api/service-requests?plantIds=" + plantid,
              {
                method: "GET",
                headers: {
                  accept: "application/json",
                  Authorization: "Bearer " + accessToken,
                },
              }
            );
             // console.log(response2.ok);
            if (response2.ok) {
              
              const data2 = await response2.json();
             // console.log("datacheck2"+data2);
              if (data2 && data.data.length>0&&Object.keys(data2).length > 0) {
              let newData = [];
              newData.push(data);
              newData.push(data2);
              return newData;
            }
          }
        }
      }
        

          // Handle cases where the API call is not successful (e.g., 401 Unauthorized)
         // return null;
          //console.log("data2",data2);
        
        });

        const alertsData = await Promise.all(fetchPromises);
        //console.log("data",JSON.stringify(alertsData));
        let dummy =[];
        alertsData.map((ele)=>{
          if(ele!=undefined){
          //aa
          const alert1=ele[0].data.flat();
          //mf
          let key = Object.keys(ele[1].data);
         // console.log(key);
          const alert2 = ele[1].data[key].filter((ele) => ele.status === "NEW");
          dummy.push(alert1);
          const alert2v1=(alert2)=>{
            
            let newAlert=[];
            alert2.map((ele)=>{
              if(check24(ele)){
                newAlert.push(ele);
                //dummy.push(ele);
              }
            })
           return newAlert;
          }
          
          dummy.push(alert2v1(alert2));
        }
          
        })
        //console.log("hero"+JSON.stringify(dummy));
        // Combine all alerts from different plants into a single array
        const combinedAlerts = dummy.flat();
        //console.log(combinedAlerts);
       // const newZ=combinedAlerts.push("=");
        setTotalAlerts(prevAlert=>prevAlert.length===combinedAlerts.length?prevAlert:combinedAlerts);
      } catch (error) {
        console.error(error);
      }
    };

     
     
    fetchData();
    // const interval = setInterval(fetchData, 30000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, [currentPlant, accessToken, totalPlants,totalAlerts]);
  //console.log("data"+JSON.stringify(totalAlerts),totalAlerts.length);
  let lengthofDisplay = totalAlerts && totalAlerts.length == 0;
  useEffect(() => {
    if (totalAlerts && totalAlerts.length > 0) {
      contentLength = totalAlerts.reduce((length, ele) => {
        if (ele) {
          const textValues = Object.values(ele).filter((value) => typeof value === "string");
          const textLength = textValues.join('').length;
          return length + textLength;
        }
        return length;
      }, 0);

      if (!isNaN(contentLength) && contentLength > 0) {
        const durationFactor = 0.05;
        const calculatedDuration = Math.max(30, contentLength * durationFactor);
        setAnimationDuration(calculatedDuration);
      } else {
        console.error("invalid content length", contentLength);
      }
    }
  }, [totalAlerts]);


  //  console.log("checking",lengthofDisplay,dataDisplay.data.length)
  
    function parseCustomDate(dateString) {
      const dateObject = new Date(dateString);
      return dateObject;
      }
    const check24=(ele)=>{
      
      if(ele.status){
        
        const dateString = parseCustomDate(ele.createdDate);
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
      else{
        return false;
      }
    }
    const urlFault=(sid)=>{
      return `https://drs.infinite-uptime.com/reports-doc/`+sid
    }
    //console.log(animationDuration);
    const urlAA=(ele)=>{
      console.log("clicked");
        window.open("https://idap.infinite-uptime.com/#/dashboard/MonitoringTable");
        // document.cookie = "idap-machineName-PROD=1BE304 - 02-GEARBOX; domain=.infinite-uptime.com"//but we tried to set cookies here-hard coded
 


    }




    return (
      
      <div className="alerts-bar" style={{ background: "#ffc0c0",color:"red",fontSize:"20px" }}onMouseEnter={() => setAnimationPaused(true)} onMouseLeave={() => setAnimationPaused(false)}>
        <div className={`marquee ${animationPaused ? 'marquee-paused' : ''}`} style={{animation:`marquee ${animationDuration}s linear infinite`}} >
         
        {totalAlerts && totalAlerts.length > 0 ? ( 
  totalAlerts.map((ele,index) => (
    <span key={index}>
      { ele.status ? 
        (<> New Fault identified for Plants {<span className="fw-bold">{ele.serviceReqMachineDetails[0]?ele.serviceReqMachineDetails[0].plantName:""}</span>} : Machine : <span className="fw-bold"> <a href={urlFault(ele.id)} target="_blank" style={{ color:"red"}}>{ele.serviceReqMachineDetails[0]?ele.serviceReqMachineDetails[0].machineName:""}</a></span> | </> )      : 
        (ele.anomalyDetected?(<> New Anomaly Alert Generated for Plants {<span className="fw-bold">{ele.plantName}</span>} : Machine :<span className="fw-bold hover"> <span onClick={(e)=>{urlAA(ele.machineName)}} target="_blank" style={{ color:"red"}}>{ele.machineName}</span></span> | </>):<></>)
    }
      
    </span>
  ))
) : (
  lengthofDisplay ? (
    <>No Anomaly Alert or New Faults Notifications in Last 24 Hours </>
  ) : (
    <>No Anomaly Alert or New Faults Notifications in Last 24 Hours</>
  )
)}

        </div>
        
      </div>
    );
  };
  

export default AlertsBar;