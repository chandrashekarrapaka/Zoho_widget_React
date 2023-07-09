import React, { useState, useEffect } from "react";
import Box from "./Box";
import "./Container.css";
import AA from "./AA/AA";
import MFI from "./MFI/MFI";
import Pagination from "../Pagination/Pagination";
import Plant from "./Plant/Plant";
import { Plants } from "../../Services/Json";
import Header from "../Header/Header";

function Container() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [timeIn, setTimeIn] = useState(30000);
  const [plantsData, setPlantsData] = useState([]);
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [kpimachines,setKpimachines]=useState(0);
  const [kpimonitors,setKpimonitors]=useState(0);
  const [noData,setNoData]=useState('');
  const [apicall,setApiCall]=useState(true);
  
  //screen things
  //console.log("insidecontainer.js");
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Plants();
        if(response[1]){
        console.log("work"+response[1]);
        if (response[0][0].length > 0) {
          //kpimonitors=response.length;
          setPlantsData(response[0]);
          
        }
        else{
          //alert('No data found');
          setNoData('No data found');
        }
      }
      else{
        setApiCall(false);
        console.log(apicall);
      }
      } catch (error) {
        console.log("error"+error);
        console.error(error);

      }
    };

    fetchData();
  }, []);

  const handleZoom = () => {
    setZoomLevel((prevZoomLevel) => (prevZoomLevel === 0 ? 50 : 0));
  };

  useEffect(() => {
    let timeout;

    if (plantsData.length > 0) {
      const currentPlant = plantsData[currentPlantIndex];
      setKpimachines(plantsData[currentPlantIndex].length);
      console.log("kpimachinesmonitors"+kpimachines)
     let kpimonitorsnew=0;
      plantsData[currentPlantIndex].map((mon)=>{
        console.log("kpimonitorsinside"+mon.monitors.length)
        kpimonitorsnew= kpimonitorsnew+mon.monitors.length;
      // return kpimonitors;
      })
      setKpimonitors(kpimonitorsnew);
      //console.log(kpimonitors);
      const totalPages = Math.ceil(currentPlant?.length / itemsPerPage);

      if (currentPage === totalPages + 1) {
        if (currentPlantIndex === plantsData.length - 1) {
          // Reached the last plant, reset to the first page and first plant
          timeout = setTimeout(() => {
            setCurrentPage(1);
            setCurrentPlantIndex(0);
          }, timeIn);
        } else {
          // Move to the next plant
          timeout = setTimeout(() => {
            setCurrentPage(1);
            setCurrentPlantIndex((prevIndex) => prevIndex + 1);
          }, timeIn);
        }
      } else {
        timeout = setTimeout(() => {
          setCurrentPage((prevPage) => prevPage + 1);
        }, timeIn);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentPage, currentPlantIndex, plantsData, timeIn]);

  const handlePageChange = (pageNumber) => {
    const totalPages = Math.ceil(plantsData[currentPlantIndex].length / itemsPerPage);
  
    if (pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
  
      if (pageNumber === totalPages && currentPlantIndex !== plantsData.length - 1) {
        // Reached the last page of a plant, move to the next plant after the timer
        setTimeout(() => {
          const nextPlantIndex = currentPlantIndex + 1;
          setCurrentPage(1);
          setCurrentPlantIndex(nextPlantIndex);
        }, timeIn);
      }
    }
  };
  
  
  
  

  const handleCheck = () => {
    if (timeIn === 30000) setTimeIn(10000000000000);
    else setTimeIn(30000);
  };

  const currentPlant = plantsData[currentPlantIndex];
  const totalPages = Math.ceil(currentPlant?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentPlant ? currentPlant.slice(indexOfFirstItem, indexOfLastItem) : [];
  //  style={{ transform: `scale(${1 + zoomLevel / 100})` }}
  return (
    <div>
      {currentPlant ? (
        <div className="wrapper">
          <div  className="PlantName">{currentPlant[0]?.plantName || ""}</div>
          <Header kpimachines={kpimachines} kpimonitors={kpimonitors} currentPlant={currentPlant}/>
          <div className="wholeContainer">
            <div className="container" >
              <Plant currentItems={currentItems} NextPlant={plantsData[currentPlantIndex + 1] !== undefined ? plantsData[currentPlantIndex + 1][0].plantName : plantsData[0][0].plantName} />
            </div>
            <div className="seccon">
              <div className="AA" >
                <AA currentPlant={currentPlant}/>
              </div>
              <div className="MFI">
                <MFI currentPlant={currentPlant} />
              </div>
            </div>
          </div>
          <div className="footer1">
            <div className="Pagination">
              <div className="Footer1-item zoomButton" onClick={handleZoom}>
                Zoom in/out
              </div>
             
              <div className="Footer1-item">
                <Pagination
                  items={currentItems}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
              <div className="Footer1-item" style={{ textAlign: "center" }}>
                <input onClick={handleCheck} type="checkbox" />
                <label>Stop AutoPagination</label>
              </div>
            </div>
          </div>
          <div className="footer2">
            <div className="indicator1">
              <div className="circle1" style={{ background: "rgb(100, 221, 23)" }}></div>
              <div className="author1">
                <p> Health Score &gt; 80%</p>
              </div>
              <div className="circle1" style={{ background: "rgb(255, 193, 7)" }}></div>
              <div className="author1">
                <p> Health Score &gt; 50% &lt; 80%</p>
              </div>
              <div className="circle1" style={{ background: "rgb(255, 87, 34)" }}></div>
              <div className="author1">
                <p> Health Score &lt; 50%</p>
              </div>
              <div className="circle1" style={{ border: "solid 1px black" }}></div>
              <div className="author1">
                <p> Health Score Not Available</p>
              </div>
            </div>
          </div>
        </div>
      ) : ((apicall===true)?
        
       (<div style={{textAlign:"center"}}><h1>{`APIs loading....${noData}`}</h1></div>)
        :( <div className="login-again">
        <p>{`For Login`}</p>
        <a href="https://crv.infinite-uptime.com/#Profile" target="_blank">Please click here</a>
      </div>)
        
      )}
    </div>
  );
}

export default Container;
