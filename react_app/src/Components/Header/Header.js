import React, { useState, useEffect } from "react";
import "./Header.css";
import KPI from "./KPI";
import { Image } from "../../Services/image";
import { LoginCredentialsAndQueries } from "../../Services/loginCredentialsAndQueries";


  
function Header(prop) {
  const [imageUrl, setImageUrl] = useState("");
   // Initialize with the initial kipobj value
  //console.log("kpimachines"+prop.kpimachines)
  const initialKipobj = {
    // kpi1: {
    //   title: "",
    //   value: "Total Devices Installed",
    // },
    // kpi2: { title: "", value: "Total Machines Digitized" },
    kpi3: { title: "3", value: "Total Faults Identified" },
    kpi4: { title: "4", value: "Reports Closed" },
    kpi5: { title: "5", value: "Downtime Saved (Hrs)" },
  };
  const newobj={
  kpi1: {
      title: "",
      value: "Total Devices Installed",
    },
    kpi2: { title: "", value: "Total Machines Digitized" }
  }
  //console.log("kpimonitors"+prop.kpimonitors,initialKipobj.kpi1.title)
  const [kipobj, setKipobj] = useState(initialKipobj);
  const [kipobjnew,setKipobjNew]=useState(newobj)
  useEffect(()=>{
    const new12={...kipobjnew,
    kpi1: {
      ...kipobjnew.kpi1,
      title: JSON.stringify(prop.kpimonitors),
    },
    kpi2: {
      ...kipobjnew.kpi2,
      title: JSON.stringify(prop.kpimachines),
    }
  }
    setKipobjNew(new12)
  },[prop.kpimachines,prop.kpimonitors])

  useEffect(() => {
    const fetchDataz = async () => {
      try {
        const response = await Image();
        if (response.length > 0) {
          console.log("imageurl", response);
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
        let  kpidata = await kpidatafinal.json();
        console.log("downtime"+JSON.stringify(kpidata.data[0]));
        
        

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
          // kpi2:{
          //   ...kipobj.kpi2,
          //   title:
          //   JSON.stringify(prop.kpimachines)
          // },
          kpi3: {
            ...kipobj.kpi3,
            title:
            JSON.stringify(kpidata.data[0].newCount)
          },
         //totaldevicesinstalled
          // kpi1: {
          //   ...kipobj.kpi1,
          //   title:
          //   JSON.stringify(prop.kpimonitors)
          // }
        };
        
       setKipobj(updatedKipobj);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlantDetails();
  }, [prop.currentPlant,prop.kpimachines,prop.kpimonitors ]);

  return (
    <div className="kpis">
      <div className="kpiItems"><img src={imageUrl} alt="Plant" /></div>
      {Object.keys(kipobjnew).map(function (ele) {
        return <KPI data={kipobjnew[ele]} />;
      })}
      {Object.keys(kipobj).map(function (ele) {
        return <KPI data={kipobj[ele]} />;
      })}
      
    </div>
  );
}

export default Header;
