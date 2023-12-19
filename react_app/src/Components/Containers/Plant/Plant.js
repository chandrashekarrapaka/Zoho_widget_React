import React,{ useState, useEffect } from "react";

import { Pie } from "react-chartjs-2";


function Plant(prop){
   
   //console.log(prop.currentItems);
    const [board,setBoard]=useState(true);
    useEffect(() => {
        console.log("chandu");
       
        setBoard(!board);
      }, [prop.board]);
    const getChartData = (plants) => {
        // const monitors = machine.monitors.length;
        //console.log(machine.monitors);
        
        const healthScores = plants.map((machine) => machine.status)
        .filter((healthScore) => healthScore !== undefined);
    
        const healthScorePercentages = [
          healthScores.filter((score) => score == 5 ).length,
          healthScores.filter((score) => score == 4).length,
          healthScores.filter((score) => score == 3).length,
          healthScores.filter((score) => score == 2 ||score == 1).length,
        ];
       
    
        return {
          // labels: ['Healthy', 'Warning', 'Critical', 'Undefined'],
          datasets: [
            {
              data: healthScorePercentages,
              backgroundColor: ['#64DD17', '#FFC107', '#FF5722', '#9E9E9E'],
            },
          ],
          options: {
            legend: {
              display: false,
            },
          },
        };
      };
      const getChartData2 = (plants) => {
        // const monitors = machine.monitors.length;
    
        //console.log(machine.monitors);
          const healthScores = plants
          .map((machine) => machine.healthScore)
          .filter((healthScore) => healthScore !== undefined);
    
        const healthScorePercentages = [
          healthScores.filter((score) => score <= 100 &&score > 80).length,
          healthScores.filter((score) => score <=80  &&score > 50).length,
          healthScores.filter((score) => score <=50  &&score > 0).length,
          healthScores.filter((score) => score == 0).length,
        ];
    
        return {
          // labels: ['Healthy', 'Warning', 'Critical', 'Undefined'],
          datasets: [
            {
              data: healthScorePercentages,
              backgroundColor: ['#64DD17', '#FFC107', '#FF5722', '#9E9E9E'],
            },
          ],
          options: {
            legend: {
              display: false,
            },
          },
        };
      };
    
    
    return(
        <div className="cement-mill-sec" >
        <div className="cement-mill-wrapper">
          <div className="row">
            {prop.currentItems.map((plants, index) => (
              
              <div key={index} className="col-lg col-20 mb-1">
                <div style={{fontWeight:"bold"}}>{plants[0].plantName}</div>
                
               {board? <Pie data={getChartData(plants)} width={200}   height={200} options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  
                  
                }} />:<Pie data={getChartData2(plants)} width={200}   height={200} options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  
                  
                }} />}
                <div>{"Corrective Action Pending: "+plants.healthScore}<br/>{"Downtime Saved: "+plants.status}<br/>{"Breakdown Avoided : "+plants.mg}</div>
                
              </div>
            ))}
           
          </div>
        </div>
      </div>
    )
}
export default Plant;