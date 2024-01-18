import React, { useState, useEffect } from "react";
import "./Container.css";
import Pagination from "../Pagination/Pagination";
import Plant from "./Plant/Plant";
import { Plants } from "../../Services/Json";
import Header from "../Header/Header";
import Footer from './Footer';
import Footerdrs from './Footerdrs';
import Footerhs from './Footerhs';
import { LoginCredentialsAndQueries } from "../../Services/loginCredentialsAndQueries";
import AppListDropdown from "../AppListDropdown";



function Container() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [timeIn, setTimeIn] = useState(30000);
  const [plantsData, setPlantsData] = useState([]);
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const [noData, setNoData] = useState('');
  const [apicall, setApiCall] = useState(true);
  const [autoPagination, setAutoPagination] = useState(true);
  const [PlantSelection, setPlantSelection] = useState(false);
  const [footerContent, setFooterContent] = useState(<Footer/>);
  const [board,SetBoard]=useState("insta");
  const [name,setName]=useState("");
  const [orgName,setOrgName]=useState("");
  const [classNameI,setClassNameI]=useState("btn btn-light px-5 py-1 fs-16 border border-dark active-button");
  const [classNameH,setClassNameH]=useState("btn btn-light px-5 py-1 fs-16 border border-dark ");
  const [classNameD,setClassNameD]=useState("btn btn-light px-5 py-1 fs-16 border border-dark ");




  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await LoginCredentialsAndQueries();

        if (response) {
         // console.log(response);
          setName(response.display_value)
         
      }
     } catch (error) {
        console.error(error);
        
      }
    };

    fetchName();
  }, [timeIn]);
  //screen things
  ////console.log("insidecontainer.js");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Plants();

        if (response[1]) {
          let plants = [];
          if(response[2]){
            const uniqueStrings = [...new Set(response[2])];
            if (uniqueStrings.length === 1) {
              console.log("All strings are the same:", uniqueStrings[0]);
              setOrgName(uniqueStrings[0]+" Corporate Dashboard");
            } else {
              console.log("Unique strings:", uniqueStrings);
              setOrgName("Infinite-UpTime Corporate Dashboard");
            }
          }
          if (response[0]) {
            response[0].forEach(element => {
              if (element.length > 0) plants.push(element);
            });

            const storedPattern = await fetchProfile();

            if (storedPattern && storedPattern !== undefined) {
              console.log("sdata");
              const uniqueOrderedIds = [...new Set(JSON.parse(storedPattern))];
              const uniquePlantIds = plants.map(plant => plant[0].plantid);
              const patternsMatch = JSON.stringify(uniqueOrderedIds.sort()) === JSON.stringify(uniquePlantIds.sort());

              if (storedPattern && storedPattern.length > 1 && patternsMatch) {
                const orderedPattern = JSON.parse(storedPattern);
                const reorderedPlantsData = orderedPattern.map((plantId) => {
                  const plant = plants.find((plant) => plant[0].plantid === plantId);
                  return plant ? plant : null;
                }).filter((plant) => plant !== null);

               // console.log("pattern",reorderedPlantsData.length);

                if (reorderedPlantsData.length === 0) {
                  setNoData('No data found');
                } else {
                  console.log("checking");
                  // Sort the plantsData based on plantName
                  const sortedPlantsData = [...reorderedPlantsData].sort((a, b) =>
                    a[0].plantName.localeCompare(b[0].plantName, undefined, {
                      numeric: true,
                      sensitivity: "base",
                    })
                  );
                  setPlantsData(sortedPlantsData);
                }
               
              //  setPlantsData(sortedPlantsData);
              } else {
                if(plants.length>0){
                  console.log("sorting");
                  const sortedPlantsData = [...plants].sort((a, b) =>
                    a[0].plantName.localeCompare(b[0].plantName, undefined, {
                      numeric: true,
                      sensitivity: "base",
                    })
                  );
                  setPlantsData(sortedPlantsData);
                }
                else{
                  // setPlantsData(plants);
                }
               
              }
            } else {
              console.log("usdata");
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
  const handleButtonClick = (type) => {
    console.log(type);
    
    if(type=="insta"){
      setFooterContent(<Footer/>);
      SetBoard("insta");
      setClassNameI("btn btn-light px-5 py-1 fs-16 border border-dark active-button");
      setClassNameH("btn btn-light px-5 py-1 fs-16 border border-dark ");
      setClassNameD("btn btn-light px-5 py-1 fs-16 border border-dark ");


    }
    else if(type=="hs"){
      SetBoard("hs");
      setFooterContent(<Footerhs/>);
      setClassNameI("btn btn-light px-5 py-1 fs-16 border border-dark ");
      setClassNameH("btn btn-light px-5 py-1 fs-16 border border-dark active-button");
      setClassNameD("btn btn-light px-5 py-1 fs-16 border border-dark ");
      
    }
    else if(type=="drs"){
      SetBoard("drs");
      setFooterContent(<Footerdrs/>);
      setClassNameI("btn btn-light px-5 py-1 fs-16 border border-dark ");
      setClassNameH("btn btn-light px-5 py-1 fs-16 border border-dark ");
      setClassNameD("btn btn-light px-5 py-1 fs-16 border border-dark active-button ");
      
    }

  };
  useEffect(() => {
    let timeout;

    if (autoPagination && plantsData.length > 0 && PlantSelection == false) {
      const currentPlant = plantsData[currentPlantIndex];

      const totalPages = Math.ceil(plantsData.length  / itemsPerPage);

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


  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    const totalPages = Math.ceil(plantsData.length / itemsPerPage);

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
    console.log(pageNumber);
  };

  const handleCheck = () => {
    setAutoPagination((prevState) => !prevState);
  }
//   const footerFunction=()=>{
// if(footerContent=="insta"){
//   return <Footer/>;
// }
// else if(footerContent=="hs"){
//   return <Footer/>;
// }
//   }

  const currentPlant = plantsData[currentPlantIndex];
  const totalPages = Math.ceil(plantsData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =plantsData.slice(indexOfFirstItem, indexOfLastItem);

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
                    <div className="header-title-section flex flex-col  mb-2">
                      <div className="head-title fs-18 fw-bold text-info">{orgName}</div>
                      <div className="title-section d-flex align-items-center justify-content-center py-2 px-3 border border-dark bg-white br-10">
                        <ul className="abbr-type d-flex mb-0 fs-16 fw-600 text-center">
                          <li className="fw-bold"><span className="text-info">CAP</span> - Corrective Action Pending</li>
                          <li className="fw-bold"><span className="text-info">DS</span> - Downtime Saved </li>
                          <li className="fw-bold"><span className="text-info">BA</span> - Breakdown Avoided</li>
                          </ul>
                      </div>
                   </div>

                    

                    <Plant board={board} currentItems={currentItems} />
                    {/* {footerFunction()} */}
                    {footerContent}

                   <div className="footer-section">
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
                      <button className={classNameI} onClick={() => handleButtonClick("insta")}>Instantenous</button>
                      <button className={classNameH }onClick={() => handleButtonClick("hs")}>Health Score</button>
                      <button className={classNameD }onClick={() => handleButtonClick("drs")}>DRS Report</button>
                    
                    </div>

                    </div>
                   

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
