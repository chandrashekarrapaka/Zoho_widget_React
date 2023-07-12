import React, { useState, useEffect } from "react";
import "./Header.css";
import KPI from "./KPI";
import { Image } from "../../Services/image";
import { LoginCredentialsAndQueries } from "../../Services/loginCredentialsAndQueries";


  
function Header(prop) {
  const [imageUrl, setImageUrl] = useState("");
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
  
  const [kipobj, setKipobj] = useState(initialKipobj);

  useEffect(() => {
    const fetchDataz = async () => {
      try {
        const response = await Image();
        if (response.length > 0) {
          // console.log("imageurl", response);
          setImageUrl(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataz();
  }, []);

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        let plantid = prop.currentPlant[0].plantid;
        let token=await LoginCredentialsAndQueries();
        
         const kpidatafinal= await fetch('https://api-idap.infinite-uptime.com/api/3.0/idap-api/service-requests/analytics?plantIds='+plantid,{
            method: 'GET',
            headers:{
              'Authorization':'Bearer '+ token,
              'accept': "*/*",
            },

          });
          //console.log(kpidatafinal.json());
        let  kpidata = await kpidatafinal.json();
        let kpidatalength=kpidata.data.length;
        console.log("downtime"+JSON.stringify(kpidatalength));
        
        
        if(kpidatalength!=0){
        const updatedKipobj = {
          ...kipobj,
          kpi4: {
            ...kipobj.kpi4,
            title: JSON.stringify(kpidata.data[0].completedCount),
          },
          kpi5: {
            ...kipobj.kpi5,
            title:JSON.stringify(kpidata.data[0].downtime),
          },
          kpi2:{
            ...kipobj.kpi2,
            title:
            JSON.stringify(prop.kpimachines)
          },
          kpi3: {
            ...kipobj.kpi3,
            title:
            JSON.stringify(kpidata.data[0].newCount+kpidata.data[0].completedCount)
          },
         //totaldevicesinstalled
          kpi1: {
            ...kipobj.kpi1,
            title:
            JSON.stringify(prop.kpimonitors)
          }
        };
        
       setKipobj(updatedKipobj);
      }
      else{
        initialKipobj.kpi2.title=JSON.stringify(prop.kpimachines);
        initialKipobj.kpi1.title=JSON.stringify(prop.kpimonitors)
        setKipobj(initialKipobj); 
      }
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlantDetails();
  }, [prop.currentPlant,prop.kpimachines,prop.kpimonitors ]);
  const result = imageUrl.includes("no image available") ||imageUrl=="";
  //console.log("rresult"+result);
  return (
    <div className="kpis">
     <div className="kpiItems"><img src={imageUrl} alt="company" /></div>
    
     {/* { !result&& <div className="kpiItems"><img src={imageUrl} alt={result} /></div>} */}
     {/* {Object.keys(kipobjnew).map(function (ele) {
        return <KPI data={kipobjnew[ele]} />;
      })} */}
      {Object.keys(kipobj).map(function (ele) {
        return <KPI data={kipobj[ele]} />;
      })}
      
    </div>
  );
}

export default Header;
