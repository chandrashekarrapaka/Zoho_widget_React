import React, { useState, useEffect } from "react";
import Box from "./Box";
import "./Container.css";
import AA from "./AA/AA";
import MFI from "./MFI/MFI";
import Pagination from "../Pagination/Pagination";
import Plant from "./Plant/Plant";
import { Plants } from "../../Services/Json";
import Header from "../Header/Header";
let kpimachines;
let kpimonitors=0;
function Container() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [timeIn, setTimeIn] = useState(30000);
  const [plantsData, setPlantsData] = useState([]);
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(0);
  
  
  //screen things
  
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (!isFullScreen) {
      enterFullScreen();
    } else {
      exitFullScreen();
    }
  };

  const enterFullScreen = () => {
    // const element = document.documentElement.getElementById("zppagesLive");
     // Get the root element of the document
    
    //  const rootElement = document.getElementById('root');
     const iframes = document.documentElement;
     console.log('idiframe'+JSON.stringify(iframes));
  const element = document.getElementById(iframes);//requestFullscreen();
    console.log("fullscreen"+element);//documentElement
    if (element.requestFullscreen) {
      element.requestFullscreen(); // Standard
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Chrome, Safari, and Opera
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // Internet Explorer/Edge
    }

    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen(); // Standard
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen(); // Firefox
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // Chrome, Safari, and Opera
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // Internet Explorer/Edge
    }

    setIsFullScreen(false);
  };
  //screen things end

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Plants();
        if (response.length > 0) {
          //kpimonitors=response.length;
          setPlantsData(response);
        }
      } catch (error) {
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
      kpimachines=plantsData[currentPlantIndex].length;
      //console.log("kpimachines"+kpimachines)
      kpimonitors=0;
      plantsData[currentPlantIndex].map((mon)=>{
        console.log("kpimonitorsinside"+mon.monitors.length)
        kpimonitors= kpimonitors+mon.monitors.length;
      // return kpimonitors;
      })

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
    setCurrentPage(pageNumber);

    if (pageNumber === Math.ceil(plantsData[currentPlantIndex]?.length / itemsPerPage)) {
      setCurrentPlantIndex((prevIndex) => (prevIndex + 1) % plantsData.length);
    }
  };

  const handleCheck = () => {
    if (timeIn === 30000) setTimeIn(1000000000);
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
           <div>
               <button className="Hidden" onClick={handleFullScreen}>
                  {isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
                </button>
              </div>
        </div>
      ) : (
        <div className="login-again">
          <p>For Login </p>
          <a href="https://crv.infinite-uptime.com/#Profile" target="_blank">Please click here</a>
          <p>For Selecting Plants scroll down</p>
        </div>
        
      )}
    </div>
  );
}

export default Container;
