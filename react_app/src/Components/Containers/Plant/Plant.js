
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { loggedInUser } from "../../../Services/loggedInUser";
import { LoginCredentialsAndQueriesA } from "../../../Services/loginCredentialsAndQueriesA";

function Plant(prop) {
  const [board, setBoard] = useState(prop.board);
  const [userId, setUserId] = useState('');
  const [plantDetails, setPlantDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState([]);
  console.log(board);


  useEffect(() => {
    const fetchDataz = async () => {
      try {
        const response2 = await loggedInUser();
        if (response2.length > 0) {
          // console.log("userid", response2);
          setUserId(response2);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataz();
  }, [userId]);

  useEffect(() => {
    

    setLoadingDetails(true); 
    const fetchDetailsForAllPlants = async () => {
      try {
        const plantIds = prop.currentItems.map(plants => plants[0].plantid);
        let token = await LoginCredentialsAndQueriesA();
       
        const requests = plantIds.map(async plantid => {
          const response = await fetch(
            `https://api.infinite-uptime.com/api/3.0/idap-api/service-requests/analytics?plantIds=${plantid}`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + token,
              'accept': "*/*",
            },
          }
          );

          const plantDetailsData = await response.json();
          

          if (plantDetailsData.data && plantDetailsData.data.length > 0) {
            const formattedPlantDetails = {
              plantid: plantid,
              details: plantDetailsData.data[0],
            };

            return formattedPlantDetails;
          }

          return null;
        });

       
        const details = await Promise.all(requests);
       
        setPlantDetails(details.filter(Boolean));

        setLoadingDetails(false); 
      } catch (error) {
        console.error(error);
        setLoadingDetails(false); 
      }
    };

    fetchDetailsForAllPlants();
  }, [prop.currentItems]);


  useEffect(() => {
    
    setBoard(prop.board);
  }, [prop.board]);

  const getChartData = (plants) => {
    const healthScores = plants
      .map((machine) => machine.status)
      .filter((healthScore) => healthScore !== undefined);

    const healthScorePercentages = [
      healthScores.filter((score) =>  score === 2 || score === 1).length,
      healthScores.filter((score) => score === 3).length,
      healthScores.filter((score) => score === 4).length,
      healthScores.filter((score) => score === 5).length,
    ];
    const filteredHealthScoreCounts = healthScorePercentages.map((count) => (count === 0 ? "" : count));
  
    return {
      datasets: [
        {
          data: filteredHealthScoreCounts,
          backgroundColor: ["#64DD17", "#FFC107", "#FF5722", "gray"],
          //backgroundColor: ["9E9E9E","FF5722","FFC107","#64DD17"],

        },
      ],
    };
  };


  const getChartData2 = (plants) => {
    const healthScorePercentages = plants.map((machine) => {
      
      const monitorHealthScores = machine.monitors.map((monitor) => monitor.healthScore);
      //console.log(monitorHealthScores);
     
      const allZeros = monitorHealthScores.every((score) => score === 0);
      //console.log(allZeros);
      
      let machineHealthScore;
      if (allZeros) {
        
        machineHealthScore = 0;
      } else {
        
        machineHealthScore = Math.min(...monitorHealthScores.filter(score => score !== undefined && score !== null && score!==0));
       // console.log(machineHealthScore);
      }
  
      return machineHealthScore;
    });
  
   // console.log("Final Health Score Percentages:", healthScorePercentages);
    const healthScorePercentagesfilter= [
      healthScorePercentages.filter((score) => score <= 100 && score >= 80).length,
      healthScorePercentages.filter((score) => score < 80 && score >= 50).length,
      healthScorePercentages.filter((score) => score < 50 && score > 0).length,
      healthScorePercentages.filter((score) => score === 0).length,
        ];
        const filteredHealthScoreCounts = healthScorePercentagesfilter.map((count) => (count === 0 ? "" : count));
  
    return {
      datasets: [
        {
          data: filteredHealthScoreCounts,
          backgroundColor: ["#64DD17", "#FFC107", "#FF5722", "white"],
        },
      ],
    };
  };
  

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        
        font: {
          weight: "bold",
          size: "25vw",
        },
        formatter: (value) => {
          
          return value;
        },
      },
    },
    legend: {
      display: false,
    },
  };

  const redirect = (board, plantid) => {
    console.log(board, plantid);

    if (board=="insta") {
      window.open(`https://crv.infinite-uptime.com/#Page:CRV_Dashboard_by_Instantaneous_Status?PlantId=${plantid}&user=${userId}`, '_blank');
    } else if (board=="hs") {
      window.open(`https://crv.infinite-uptime.com/#Page:CRV_Dashboard_by_HealthScore?PlantId=${plantid}&user=${userId}`, '_blank');
    }
    else if (board=="drs") {
      window.open(`https://crv.infinite-uptime.com/#Page:CRV_Dashboard_by_HealthScore?PlantId=${plantid}&user=${userId}`, '_blank');
    }
  };
const boardDisplay=(plants)=>{
 
  if(board=="insta"){
    return(<Pie
     data={getChartData(plants)}
     width={300}
     height={300}
     options={options}
     plugins={[ChartDataLabels]}
   />)
       
    
 
     }
     else if(board=="hs"){
      return( <Pie
       data={getChartData2(plants)}
       width={300}
       height={300}
       options={options}
       plugins={[ChartDataLabels]}
     />)
     }
     else if(board=="drs"){
      return( <Pie
       data={getChartData2(plants)}
       width={300}
       height={300}
       options={options}
       plugins={[ChartDataLabels]}
     />)
     }
     
  }

  return (
    <div className="cement-mill-sec">
      <div className="cement-mill-wrapper">
        <div className="row">
          {prop.currentItems.map((plants, index) => (
            <div key={index} className="col-md-4 col-sm-6 cols-6">
          <div className="chart-box p-2 border border-dark rounded-3 text-center  d-flex align-items-center flex-column">
              <a className="text-uppercase text-decoration-none fs-16" onClick={() => { redirect(board, plants[0].plantid) }} target="_blank" style={{ fontWeight: 'bold', cursor: 'pointer', minHeight: '3vw', color:'#000'}}>{plants[0].plantName}</a>
              <div className="pie-chart w-100 d-flex align-items-center justify-content-center mb-2">
              {boardDisplay(plants)}
              
              </div>
              
                {/* Conditional rendering based on loading state */}
                {loadingDetails ? (
                  <p>Loading details...</p>
                ) : (
                  <div className="stats w-100 d-flex justify-content-evenly">
                    {/* Conditional rendering based on loading state */}
                    {loadingDetails ? (
                      <p>Loading details...</p>
                    ) : (
                      <>
                        <div className="stat-single">
                        <span className="fs-18 fw-bold text-info">
                        {(plantDetails.find(
                            (details) => details.plantid === plants[0].plantid
                          )?.details.newCount ?? "0")}</span>
                          <h6 className="fw-bold fs-14 mb-0">CAP</h6>
                        </div>
                        <div className="stat-border" style={{height: '6vh', width: '2px', backgroundColor: '#d6d6d6'}}></div>
                        <div className="stat-single">
                        <span className="fs-18 fw-bold text-info">
                        {(plantDetails.find(
                            (details) => details.plantid === plants[0].plantid
                          )?.details.downtime ?? "0")}
                          </span>
                          <h6 className="fw-bold fs-14 mb-0">DS(Hrs)</h6>
                        </div>
                        <div className="stat-border" style={{height: '6vh', width: '2px', backgroundColor: '#d6d6d6'}}></div>
                        <div className="stat-single">
                        <span className="fs-18 fw-bold text-info">
                        {(plantDetails.find(
                            (details) => details.plantid === plants[0].plantid
                          )?.details.tpCount ?? "0")}
                          </span>
                          <h6 className="fw-bold fs-14 mb-0">BA</h6>
                          </div>
                      </>
                    )}
                  </div>

                )}
              
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Plant;