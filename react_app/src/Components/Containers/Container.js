import React, { useState, useEffect } from "react";
import Box from "./Box";
import "./Container.css";
import AA from "./AA/AA";
import MFI from "./MFI/MFI";
import Pagination from "../Pagination/Pagination";
import Plant from "./Plant/Plant";
import { Plants } from "../../Services/Json";

function Container() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [timeIn, setTimeIn] = useState(5000);
  const [plantsData, setPlantsData] = useState([]);
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Plants();
        if (response.length > 0) {
           console.log(response.length);
          setPlantsData(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const totalPages = plantsData[currentPlantIndex]?.machineGroups.length || 0;
  //   let timeout;

  //   if (currentPage === totalPages && currentPage !== 1) {
  //     timeout = setTimeout(() => {
  //       setCurrentPlantIndex((prevIndex) => (prevIndex + 1) % plantsData.length);
  //       setCurrentPage(1);
  //     }, timeIn);
  //   } else if (currentPage === totalPages && currentPlantIndex === plantsData.length - 1) {
  //     timeout = setTimeout(() => {
  //       setCurrentPage(1);
  //     }, timeIn);
  //   } else {
  //     timeout = setTimeout(() => {
  //       setCurrentPage((prevPage) => {
  //         if (prevPage === totalPages) {
  //           return 1;
  //         } else {
  //           return prevPage + 1;
  //         }
  //       });
  //     }, timeIn);
  //   }
  //   console.log(currentPage, currentPlantIndex, plantsData, timeIn);
  //   return () => clearTimeout(timeout);
  // }, [currentPage, currentPlantIndex, plantsData, timeIn]);
 
  
  useEffect(() => {
    let timeout;
  
    if (plantsData.length > 0) {
      const currentPlant = plantsData[currentPlantIndex];
      const totalPages = Math.ceil(currentPlant?.machineGroups.length / itemsPerPage);
  
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

    if (pageNumber === Math.ceil(plantsData[currentPlantIndex].machineGroups.length / itemsPerPage)) {
      setCurrentPlantIndex((prevIndex) => (prevIndex + 1) % plantsData.length);
    }
  };

  const handleCheck = () => {
    if (timeIn === 5000) setTimeIn(10000000);
    else setTimeIn(5000);
  };

  const currentPlant = plantsData[currentPlantIndex];
  const totalPages = currentPlant?.machineGroups.length || 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentPlant
    ? currentPlant.machineGroups.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <div>
      {currentPlant ? (
        <div>
          <div className="PlantName">{currentPlant.name}</div>
          <div className="wholeContainer">
            <div className="container">
              <Plant currentItems={currentItems} />
            </div>
            <div className="seccon">
              <div className="AA">
                <AA />
              </div>
              <div className="MFI">
                <MFI />
              </div>
            </div>
          </div>
          <div className="footer1">
            <div className="Pagination">
              <div className="Footer1-item">Zoom in/out</div>
              <div className="Footer1-item">
                <Pagination
                  items={currentPlant.machineGroups}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
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
                <p>Health Score &gt; 80%</p>
              </div>
              <div className="circle1" style={{ background: "rgb(255, 193, 7)" }}></div>
              <div className="author1">
                <p>Health Score &gt; 50% &lt; 80%</p>
              </div>
              <div className="circle1" style={{ background: "rgb(255, 87, 34)" }}></div>
              <div className="author1">
                <p>Health Score &lt; 50%</p>
              </div>
              <div className="circle1" style={{ border: "solid 1px black" }}></div>
              <div className="author1">
                <p>Health Score Not Available</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Login again</p>
        </div>
      )}
    </div>
  );
}

export default Container;
