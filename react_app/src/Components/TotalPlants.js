import React, { useState,useEffect } from "react";
import { Plants } from "../Services/Json";
import KPI from "./Header/KPI";
import { LoginCredentialsAndQueries } from "../Services/loginCredentialsAndQueries";


function TotalPlants(prop){
    const initialKipobj = {
        kpi1: {
          title: "",
          value: "Total Devices Installed",
          class:"fa fa-wifi"
        },
        kpi2: { title: "", value: "Total Machines Digitized",symbol:"&#xe1b1;",class:"material-icons" },
        kpi3: { title: "", value: "Total Faults Identified",class:"fa fa-exclamation-triangle" },
        kpi4: { title: "", value: "Reports Closed",class:"fa fa-book" },
        kpi5: { title: "", value: "Downtime Saved (Hrs)",class:"fa fa-clock-o" },
      };
      let kpimonitorsnew=0;
      let kpimachinesnew=0;
      prop.plantsData.forEach(element => {
        kpimachinesnew=kpimachinesnew+ element.length;
        element.forEach(ele=>{
            kpimonitorsnew= kpimonitorsnew+ele.monitors.length;
        })
        
      });
     // console.log(kpimachinesnew);
      const [kipobj, setKipobj] = useState(initialKipobj);
      useEffect(() => {
        const fetchPlantDetails = async () => {
          try {
            let token=await LoginCredentialsAndQueries();
            const requests = prop.plantsData.map(plant =>
            //  let newplantid = plant[0].plantid;
        fetch('https://api-idap.infinite-uptime.com/api/3.0/idap-api/service-requests/analytics?plantIds=' + plant[0].plantid, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
            'accept': "*/*",
          },
        })
        
      );
      const responses = await Promise.all(requests);
      const kpidataList = await Promise.all(responses.map((response) => response.json()));
      console.log(kpidataList);
      let newcompletedCount='';
      let newdowntime='';
      let newnewCount='';
      if(kpidataList){
        kpidataList.map(kpi=>{
            if(kpi.data){
                //console.log(typeof newcompletedCount);
           newcompletedCount=Number(newcompletedCount)+ kpi.data[0].completedCount;
           //console.log(kpi.data[0].completedCount);
           newdowntime=Number(newdowntime)+kpi.data[0].downtime;
           newnewCount=Number(newnewCount)+kpi.data[0].newCount+kpi.data[0].completedCount;
           //console.log(newcompletedCount);
       } })
       const updatedKipobj = {
        ...kipobj,
        kpi4: {
          ...kipobj.kpi4,
          title: JSON.stringify(newcompletedCount),
        },
        kpi5: {
          ...kipobj.kpi5,
          title:JSON.stringify(newdowntime),
        },
        kpi2:{
          ...kipobj.kpi2,
          title:
          JSON.stringify(kpimachinesnew)
        },
        kpi3: {
          ...kipobj.kpi3,
          title:
          JSON.stringify(newnewCount)
        },
       //totaldevicesinstalled
        kpi1: {
          ...kipobj.kpi1,
          title:
          JSON.stringify(kpimonitorsnew)
        }
      };
      setKipobj(updatedKipobj);
      }
          else{
            initialKipobj.kpi2.title=JSON.stringify(kpimachinesnew);
            initialKipobj.kpi1.title=JSON.stringify(kpimonitorsnew)
            setKipobj(initialKipobj); 
          }
            
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPlantDetails();
      }, [prop]);    


    return(
        <div className="kpis">
           
      {Object.keys(kipobj).map(function (ele) {
        return <KPI data={kipobj[ele]} />;
      })}
      
    </div>
    )
}
export default TotalPlants;