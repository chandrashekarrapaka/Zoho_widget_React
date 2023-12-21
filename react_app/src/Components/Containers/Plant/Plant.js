import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { loggedInUser } from "../../../Services/loggedInUser";
import { LoginCredentialsAndQueries } from "../../../Services/loginCredentialsAndQueries";

function Plant(prop) {
  const [board, setBoard] = useState(true);
  const [userId,setUserId]=useState('');
  const [plantDetails, setPlantDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState([]);
  const [arrayOfPlants,setArrayOfPlants]=useState([]);
  
  const fetchDetailsForAllPlants = () => {
    prop.currentItems.forEach((plants) => {
      const plantid = plants[0].plantid; // Assuming plantid is available in the first item of the array
      fetchPlantDetails(plantid);
    });
  };

  useEffect(() => {
    // Fetch details for all plants when the component mounts
    fetchDetailsForAllPlants();
  }, [prop.currentItems]); // Trigger the effect when prop.currentItems changes

  useEffect(() => {
    const fetchDataz = async () => {
      try {
        const response2=await loggedInUser();
        if ( response2.length > 0) {
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
    setBoard(!board);
  }, [prop.board]);

  const getChartData = (plants) => {
    const healthScores = plants
      .map((machine) => machine.status)
      .filter((healthScore) => healthScore !== undefined);

    const healthScorePercentages = [
      healthScores.filter((score) => score === 5).length,
      healthScores.filter((score) => score === 4).length,
      healthScores.filter((score) => score === 3).length,
      healthScores.filter((score) => score === 2 || score === 1).length,
    ];

    return {
      datasets: [
        {
          data: healthScorePercentages,
          backgroundColor: ["#64DD17", "#FFC107", "#FF5722", "#9E9E9E"],
        },
      ],
    };
  };
  const getChartData2 = (plants) => {
    const healthScores = plants
      .map((machine) => machine.healthScore)
      .filter((healthScore) => healthScore !== undefined);

      const healthScorePercentages = [
        healthScores.filter((score) => score <= 100 && score > 80).length,
        healthScores.filter((score) => score <= 80 && score > 50).length,
        healthScores.filter((score) => score <= 50 && score > 0).length,
        healthScores.filter((score) => score === 0).length,
      ];
    return {
      datasets: [
        {
          data: healthScorePercentages,
          backgroundColor: ["#64DD17", "#FFC107", "#FF5722", "#9E9E9E"],
        },
      ],
    };
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: "white",
        font: {
          weight: "bold",
          size: 16,
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
  const fetchPlantDetails = async (plantid) => {
    try {
      let token = await LoginCredentialsAndQueries();

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

        setPlantDetails((prevDetails) => [
          ...prevDetails,
          formattedPlantDetails,
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const redirect = (board, plantid) => {
    console.log(board, plantid);

    if (board) {
      window.open(`https://crv.infinite-uptime.com/#Page:CRV_Dashboard_by_Instantaneous_Status?PlantId=${plantid}&user=${userId}`, '_blank');
    } else {
      window.open(`https://crv.infinite-uptime.com/#Page:CRV_Dashboard_by_HealthScore?PlantId=${plantid}&user=${userId}`, '_blank');
    }
  };

  return (
    <div className="cement-mill-sec">
      <div className="cement-mill-wrapper">
        <div className="row">
          {prop.currentItems.map((plants, index) => (
            <div key={index} className="col-lg col-20 mb-1">
              <a onClick={() => { redirect(board, plants[0].plantid) }} target="_blank" style={{ fontWeight: 'bold', cursor: 'pointer' }}>{plants[0].plantName}</a>
              {board ? (
                <Pie
                  data={getChartData(plants)}
                  width={200}
                  height={200}
                  options={options}
                  plugins={[ChartDataLabels]}
                />
              ) : (
                <Pie
                  data={getChartData2(plants)}
                  width={200}
                  height={200}
                  options={options}
                  plugins={[ChartDataLabels]}
                />
              )}
              <div>
                {/* Conditional rendering based on loading state */}
                {loadingDetails ? (
                  <p>Loading details...</p>
                ) : (
                  <>
                    {"Corrective Action Pending: " + (plantDetails.find(details => details.plantid === plants[0].plantid)?.details.correctiveActionPending || "")}
                    <br />
                    {"Downtime Saved: " + ""}
                    <br />
                    {"Breakdown Avoided : " + ""}
                  </>
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