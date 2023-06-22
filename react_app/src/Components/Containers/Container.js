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
  const itemsPerPage = 10;
  const [timeIn, setTimeIn] = useState(5000);
  const [plantsData, setPlantsData] = useState([]);
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Plants();
        if (response.length > 0) {
          setPlantsData(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let timeout;

    if (plantsData.length > 0) {
      const currentPlant = plantsData[currentPlantIndex];
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
    if (timeIn === 5000) setTimeIn(10000000);
    else setTimeIn(5000);
  };

  const currentPlant = plantsData[currentPlantIndex];
  const totalPages = Math.ceil(currentPlant?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentPlant
    ? currentPlant.slice(indexOfFirstItem, indexOfLastItem)
    : [];
// console.log("currentPlant"+JSON.stringify(currentPlant.plantName));
  return (
    <div>
      {currentPlant ? (
        <div>
          <div className="PlantName"></div>
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
        <div className="login-again">
          <p>Login again</p>
        </div>
      )}
    </div>
  );
}

export default Container;
