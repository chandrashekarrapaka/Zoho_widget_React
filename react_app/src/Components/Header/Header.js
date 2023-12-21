import React, { useState, useEffect } from "react";
import KPIofPlant from "./KPIofPlant";
import { Image } from "../../Services/image";
import { LoginCredentialsAndQueries } from "../../Services/loginCredentialsAndQueries";
import icon1 from '../../assets/imgs/about-white-icon-1.png';
import icon2 from '../../assets/imgs/about-white-icon-2.png';
import icon3 from '../../assets/imgs/about-white-icon-3.png';
import icon4 from '../../assets/imgs/about-white-icon-4.png';
import icon5 from '../../assets/imgs/about-white-icon-5.png';
import test from '../../assets/imgs/icons8-wi-fi-off-30.png';




  
function Header(prop) {
  
  const initialKipobj = {
    kpi1: {
      title: "",
      value: "Total Devices Installed",
      src:icon1
    },
    kpi2: { title: "", value: "Total Machines Digitized",src:icon2},
    kpi3: { title: "", value: "Total Faults Identified",src:icon3 },
    kpi4: { title: "", value: "Corrective Action Taken",src:icon4 },
    kpi5: { title: "", value: "Downtime Saved (Hrs)",src:icon5 },
    kpi6: { title: "", value: "Disconnected" ,src:test },
  };
  
  const [kipobj, setKipobj] = useState(initialKipobj);

 // console.log(prop.kpidisconnected);

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        let plantid = prop.currentPlant[0].plantid;
        let token=await LoginCredentialsAndQueries();
        
         const kpidatafinal= await fetch('https://api.infinite-uptime.com/api/3.0/idap-api/service-requests/analytics?plantIds='+plantid,{
            method: 'GET',
            headers:{
              'Authorization':'Bearer '+ token,
              'accept': "*/*",
            },

          });
          //console.log(kpidatafinal.json());
        let  kpidata = await kpidatafinal.json();
        let kpidatalength=kpidata.data.length;
        //console.log("downtime"+JSON.stringify(kpidatalength));
        
        
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
          kpi6: {
            ...kipobj.kpi6,
            title:
            JSON.stringify(prop.kpidisconnected)
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
        initialKipobj.kpi1.title=JSON.stringify(prop.kpimonitors);
        initialKipobj.kpi3.title='-';
        initialKipobj.kpi4.title='-';
        initialKipobj.kpi5.title='-';
        initialKipobj.kpi6.title= JSON.stringify(prop.kpidisconnected);
        setKipobj(initialKipobj); 
      }
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlantDetails();
  }, [prop.currentPlant,prop.kpimachines,prop.kpimonitors,prop.kpidisconnected ]);
  
  //console.log("rresult"+result);
  return (
    <div className="boxes-section row">
      {Object.keys(kipobj).map(function (ele) {
        return <KPIofPlant data={kipobj[ele]} />;
      })}
      
    </div>
  );
}

export default Header;
