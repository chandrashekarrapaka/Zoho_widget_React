import React, { useState, useEffect } from "react";
import "./Container.css";
import AA from "./AA/AA";
import MFI from "./MFI/MFI";
import Pagination from "../Pagination/Pagination";
import Plant from "./Plant/Plant";
import { Plants } from "../../Services/Json";
import Header from "../Header/Header";
import TotalPlants from "../TotalPlants";
import AlertsBar from "./Scrollbar/AlertsBar";

function Container() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [timeIn, setTimeIn] = useState(30000);
  const [plantsData, setPlantsData] = useState([]);
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [kpimachines, setKpimachines] = useState(0);
  const [kpidisconnected, setKpiDisconnected] = useState(0);
  const [kpimonitors, setKpimonitors] = useState(0);
  const [noData, setNoData] = useState('');
  const [apicall, setApiCall] = useState(true);
  const [autoPagination, setAutoPagination] = useState(true); 
  const [PlantSelection,setPlantSelection]=useState(false);

  //screen things
  ////console.log("insidecontainer.js");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Plants();
       // console.log("work"+JSON.stringify(response[0][0]));
        //console.log(response);

        if (response[1]) {
          
          let plants=[];
          if (response[0]) {
            //kpimonitors=response.length;
           
            response[0].forEach(element => {
             if (element.length>0)plants.push(element); 
            });
            setPlantsData(plants);
           // console.log("work"+response[1].length,plants.length);
            if(plants.length==0){
              setNoData('No data found');
            }

          }
          else {
            //alert('No data found');
            setNoData('No data found');
          }
        }
        else {
          setApiCall(false);
          //console.log(apicall);
        }
      } catch (error) {
        //console.log("error" + error);
        console.error(error);

      }
    };

    fetchData();
  }, [timeIn]);

  useEffect(() => {
    let timeout;

    if (autoPagination && plantsData.length > 0&&PlantSelection==false) {
      const currentPlant = plantsData[currentPlantIndex];
      setKpimachines(plantsData[currentPlantIndex].length);

      let kpimonitorsnew = 0;
      let kpidisconnectednew = 0;
      plantsData[currentPlantIndex].forEach((mon) => {
        mon.monitors.forEach((ele)=>{
          if(ele.status==5){
            //console.log(ele.status,currentPlantIndex);
            kpidisconnectednew++;
            
          }
        }) 
        kpimonitorsnew += mon.monitors.length;
      });
     // console.log(currentPlantIndex);
      setKpiDisconnected(kpidisconnectednew);
      setKpimonitors(kpimonitorsnew);

      const totalPages = Math.ceil(currentPlant?.length / itemsPerPage);

      if (currentPage > totalPages ) {
        if (currentPlantIndex === plantsData.length - 1) {
          timeout = setTimeout(() => {
            setCurrentPage(1);
            setCurrentPlantIndex(0);
          }, 0);
        } else {
          timeout = setTimeout(() => {
            setCurrentPage(1);
            setCurrentPlantIndex((prevIndex) => prevIndex + 1);
          }, 0);
        }
      } else {
        timeout = setTimeout(() => {
          setCurrentPage((prevPage) => prevPage + 1);
        }, timeIn);
      }
    }
    

    return () => clearTimeout(timeout);
  }, [currentPage, currentPlantIndex, plantsData, autoPagination]);

  const handleNextPlant = () => {
    const nextPage = currentPage + 1;
  
    
      
      // If we're at the end of the current plant, switch to the next plant
      const nextPlantIndex = (currentPlantIndex + 1) % plantsData.length;
      if(nextPlantIndex>plantsData.length-1){
      setCurrentPlantIndex(nextPlantIndex);
      setCurrentPage(1);
      }else{
        setCurrentPlantIndex(nextPlantIndex);
        setCurrentPage(1);
      } // Reset currentPage for the new plant
      const currentPlant = plantsData[currentPlantIndex];
      setKpimachines(plantsData[currentPlantIndex].length);

      let kpimonitorsnew = 0;
      let kpidisconnectednew = 0;

      plantsData[currentPlantIndex].forEach((mon) => {
        
        mon.monitors.forEach((ele)=>{
          if(ele.status==5){
           // console.log(ele.status,currentPlantIndex);
            kpidisconnectednew++;
            
          }
        })
        kpimonitorsnew += mon.monitors.length;
      });
      //console.log(currentPlantIndex);
      setKpiDisconnected(kpidisconnectednew);
      setKpimonitors(kpimonitorsnew);
    
  };
  //console.log(currentPlantIndex+""+kpidisconnected);
  const handlePageChange = (pageNumber) => {
    const totalPages = Math.ceil(plantsData[currentPlantIndex].length / itemsPerPage);

    if (pageNumber <= totalPages) {
      setCurrentPage(pageNumber);

      if (pageNumber === totalPages && currentPlantIndex !== plantsData.length - 1) {
        setTimeout(() => {
          const nextPlantIndex = currentPlantIndex + 1;
          setCurrentPage(1);
          setCurrentPlantIndex(nextPlantIndex);
        }, timeIn);
      }
    }
  };

  const handleCheck = () => {
    setAutoPagination((prevState) => !prevState);
  }
 
 
  const currentPlant = plantsData[currentPlantIndex];
  const totalPages = Math.ceil(currentPlant?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentPlant ? currentPlant.slice(indexOfFirstItem, indexOfLastItem) : [];
  
  //  style={{ transform: `scale(${1 + zoomLevel / 100})` }}
  return (
    <div>

      {(currentPlant && apicall) ? (

        <section className="dashboard-sec">
          <div className="container-fluid">
            <div className="header">
              <TotalPlants plantsData={plantsData} />
            </div>

            <div className="main-content">
              <div className="row">
                <div className="col-lg-9">
                  <div className="left-main">
                    <div className="title-section d-flex mb-2 align-items-center justify-content-between py-2 px-3 bg-white br-10">
                      <p className="mb-0 fs-4 fw-600"> {currentPlant[0]?.plantName || ""}</p>
                      <p className="mb-0 text-gray" onClick={(e)=>{handleNextPlant(currentPlantIndex)}}> Coming Next: <strong className="text-primary" style={{ cursor: "pointer" }} >{plantsData[currentPlantIndex + 1] !== undefined ? plantsData[currentPlantIndex + 1][0].plantName : plantsData[0][0].plantName}</strong></p>
                    </div>

                    <Header kpidisconnected={kpidisconnected} kpimachines={kpimachines} kpimonitors={kpimonitors} currentPlant={currentPlant} />
                   
                    <Plant currentItems={currentItems} NextPlant={plantsData[currentPlantIndex + 1] !== undefined ? plantsData[currentPlantIndex + 1][0].plantName : plantsData[0][0].plantName} />
                    
                    <div className="pagination-sec" style={{paddingBottom:"20px"}}>
                      <div className="row">
                        <div class="pagination-section">
                          <div class="pagination-inner-sec">
                            <ul className="pagination-block">
                              <Pagination
                                items={currentItems}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                              />
                            </ul>
                            <div className="stop-auto-pagination" >
                              <form>
                                <input onClick={handleCheck} type="checkbox" />
                                Stop Auto Pagination
                              </form>

                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="health-score-sec">
                      <div className="row">
                        <div className="col-lg-3 mb-3 col-md-6 col-sm-6">
                          <div className="health-score-box py-2 px-3">
                            <div className="score-box green"></div>
                            <p className="text-dark fs-12 mb-0 fw-bold">Normal</p>
                          </div>
                        </div>

                        <div className="col-lg-3 mb-3 col-md-6 col-sm-6">
                          <div className="health-score-box py-2 px-3">
                            <div className="score-box yellow"></div>
                            <p className="text-dark fs-12 mb-0 fw-bold">Caution
                            </p>
                          </div>
                        </div>

                        <div className="col-lg-3 mb-3 col-md-6 col-sm-6">
                          <div className="health-score-box py-2 px-3">
                            <div className="score-box red"></div>
                            <p className="text-dark fs-12 mb-0 fw-bold">Warning
                            </p>
                          </div>
                        </div>

                        <div className="col-lg-3 mb-3 col-md-6 col-sm-6">
                          <div className="health-score-box py-2 px-3">
                            <div className="score-box text-bg-secondary"></div>
                            <p className="text-dark fs-12 mb-0 fw-bold " >Disconnected
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="right-main">
                    <div className="row">
                      <div className="col-lg-12 col-md-4 col-sm-6 mb-3" >
                        <AA currentPlant={currentPlant} />
                      </div>
                      <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                        <MFI currentPlant={currentPlant} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          <AlertsBar  currentPlant={currentPlant} plantsData={plantsData}/>
          </div>
        </section>
      ) : ((apicall === true) ?

        (<div style={{ textAlign: "center" }}><h1>{`loading....${noData}`}</h1></div>)
        : (<div className="login-again">
          <p>{`Invalid Token, Please Login here`}</p>
          <a href="https://crv.infinite-uptime.com/#Profile" target="_blank">Please click here</a>
        </div>)

      )}
    </div>
  );
}

export default Container;
