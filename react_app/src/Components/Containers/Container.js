import React, { useState, useEffect } from "react";
import "./Container.css";
import AA from "./AA/AA";
import MFI from "./MFI/MFI";
import Pagination from "../Pagination/Pagination";
import Plant from "./Plant/Plant";
import { Plants } from "../../Services/Json";
import Header from "../Header/Header";
import TotalPlants from "../TotalPlants";

function Container() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [timeIn, setTimeIn] = useState(30000);
  const [plantsData, setPlantsData] = useState([]);
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [kpimachines, setKpimachines] = useState(0);
  const [kpimonitors, setKpimonitors] = useState(0);
  const [noData, setNoData] = useState('');
  const [apicall, setApiCall] = useState(true);
  const [autoPagination, setAutoPagination] = useState(true); 

  //screen things
  ////console.log("insidecontainer.js");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Plants();
        // //console.log("work"+JSON.stringify(response[0][0]));
        if (response[1]) {
          ////console.log("work"+response);
          if (response[0][0].length > 0) {
            //kpimonitors=response.length;
            setPlantsData(response[0]);

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

    if (autoPagination && plantsData.length > 0) {
      const currentPlant = plantsData[currentPlantIndex];
      setKpimachines(plantsData[currentPlantIndex].length);

      let kpimonitorsnew = 0;
      plantsData[currentPlantIndex].forEach((mon) => {
        kpimonitorsnew += mon.monitors.length;
      });
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
                      <p className="mb-0 text-gray"> Coming Next: <strong>{plantsData[currentPlantIndex + 1] !== undefined ? plantsData[currentPlantIndex + 1][0].plantName : plantsData[0][0].plantName}</strong></p>
                    </div>

                    <Header kpimachines={kpimachines} kpimonitors={kpimonitors} currentPlant={currentPlant} />
                   
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
