import React, { useState, useEffect } from "react";
import "./Container.css";
import Pagination from "../Pagination/Pagination";
import Plant from "./Plant/Plant";
import { Plants } from "../../Services/Json";
import Header from "../Header/Header";
import Footer from './Footer';
import Footerhs from './Footerhs';



function Container() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [timeIn, setTimeIn] = useState(30000);
  const [plantsData, setPlantsData] = useState([]);
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const [noData, setNoData] = useState('');
  const [apicall, setApiCall] = useState(true);
  const [autoPagination, setAutoPagination] = useState(true);
  const [PlantSelection, setPlantSelection] = useState(false);
  const [footerContent, setFooterContent] = useState(<Footer/>);



  //screen things
  ////console.log("insidecontainer.js");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Plants();

        if (response[1]) {
          let plants = [];

          if (response[0]) {
            response[0].forEach(element => {
              if (element.length > 0) plants.push(element);
            });

            const storedPattern = await fetchProfile();

            if (storedPattern && storedPattern !== undefined) {
              const uniqueOrderedIds = [...new Set(JSON.parse(storedPattern))];
              const uniquePlantIds = plants.map(plant => plant[0].plantid);
              const patternsMatch = JSON.stringify(uniqueOrderedIds.sort()) === JSON.stringify(uniquePlantIds.sort());

              if (storedPattern && storedPattern.length > 1 && patternsMatch) {
                const orderedPattern = JSON.parse(storedPattern);
                const reorderedPlantsData = orderedPattern.map((plantId) => {
                  const plant = plants.find((plant) => plant[0].plantid === plantId);
                  return plant ? plant : null;
                }).filter((plant) => plant !== null);

                setPlantsData(reorderedPlantsData);
              } else {
                setPlantsData(plants);
              }
            } else {
              setPlantsData(plants);
            }

            if (plants.length === 0) {
              setNoData('No data found');
            }
          } else {
            setNoData('No data found');
          }
        } else {
          setApiCall(false);
        }
      } catch (error) {
        console.error(error);
        setNoData('Error occurred while fetching data.');
      }
    };

    fetchData();
  }, [timeIn]);

  const fetchProfile = async () => {
    try {
      const data = await window.ZOHO.CREATOR.init();
      let userid = window.ZOHO.CREATOR.UTIL.getQueryParams().user;
      var config = {
        appName: "infinite-control-room",
        reportName: "My_Profile_Data",
        criteria: "Username == \"" + userid + "\"",
        page: "1",
        pageSize: "100"
      };
      const response = await window.ZOHO.CREATOR.API.getAllRecords(config);
      const idx = response.data[0].PlantPattern;
      console.log(idx);
      return idx;
    } catch (error) {
      console.error(error);
      // Handle error cases
      return null; // Or any appropriate value indicating error
    }
  };
  const handleButtonClick = (content) => {
    // Function to handle button click and update Footer content
    setFooterContent(content);
  };
  useEffect(() => {
    let timeout;

    if (autoPagination && plantsData.length > 0 && PlantSelection == false) {
      const currentPlant = plantsData[currentPlantIndex];

      const totalPages = Math.ceil(currentPlant?.length / itemsPerPage);

      if (currentPage > totalPages) {
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
    if (nextPlantIndex > plantsData.length - 1) {
      setCurrentPlantIndex(nextPlantIndex);
      setCurrentPage(1);
    } else {
      setCurrentPlantIndex(nextPlantIndex);
      setCurrentPage(1);
    } // Reset currentPage for the new plant
    const currentPlant = plantsData[currentPlantIndex];


    let kpimonitorsnew = 0;
    let kpidisconnectednew = 0;

    plantsData[currentPlantIndex].forEach((mon) => {

      mon.monitors.forEach((ele) => {
        if (ele.status == 5) {

          kpidisconnectednew++;

        }
      })
      kpimonitorsnew += mon.monitors.length;
    });



  };

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

            </div>

            <div className="main-content">
              <div >
                <div >
                  <div >
                      <div className="title-section d-flex mb-2 align-items-center justify-content-center py-2 px-3 bg-white br-10">
                    <p className="mb-0 fs-18 fw-600 text-center">{currentPlant[0]?.plantName || ""}</p>
                   </div>



                    <Plant  currentItems={currentItems} NextPlant={plantsData[currentPlantIndex + 1] !== undefined ? plantsData[currentPlantIndex + 1][0].plantName : plantsData[0][0].plantName} />

                    <div className="pagination-sec" style={{ paddingBottom: "10px" }}>
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
                    <div className="button-container d-flex justify-content-center gap-3">
                      <button className="btn btn-primary" onClick={() => handleButtonClick(<Footer/>)}>Instantenous</button>
                      <button className="btn btn-primary" onClick={() => handleButtonClick(<Footerhs/>)}>HealthScore</button>
                    </div><br/>
                    {footerContent}

                  </div>
                </div>

              </div>
            </div>


            {/* <AlertsBar  currentPlant={currentPlant} plantsData={plantsData}/> */}
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
