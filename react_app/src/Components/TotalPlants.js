import React, { useState,useEffect } from "react";
import KPI from "./Header/KPI";
import { LoginCredentialsAndQueries } from "../Services/loginCredentialsAndQueries";
import { Image } from "../Services/image";

import icon1 from '../assets/imgs/about-icon-1.png';
import icon2 from '../assets/imgs/about-icon-2.png';
import icon3 from '../assets/imgs/about-icon-3.png';
import icon4 from '../assets/imgs/about-icon-4.png';
import icon5 from '../assets/imgs/about-icon-5.png';


function TotalPlants(prop){
  const [imageUrl, setImageUrl] = useState("");
    const initialKipobj = {
        kpi1: {
          title: "",
          value: "Total Devices Installed",
         src:icon1
        },
        kpi2: { title: "", value: "Total Machines Digitized", src:icon2},
        kpi3: { title: "", value: "Total Faults Identified", src:icon3 },
        kpi4: { title: "", value: "Reports Closed", src:icon4},
        kpi5: { title: "", value: "Downtime Saved (Hrs)" , src:icon5},
        kpi6: { title: "", value: "Disconnected" },
       

      };
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
      let kpimonitorsnew=0;
      let kpimachinesnew=0;
      let kpidisconnected=0;
      prop.plantsData.forEach(element => {
       // console.log(element.length);
        kpimachinesnew=kpimachinesnew+ element.length;
        element.forEach(ele=>{
          ele.monitors.forEach((emoni)=>{
            if(emoni.status==5){
              kpidisconnected++;
            }
            })
            kpimonitorsnew= kpimonitorsnew+ele.monitors.length;
           // console.log( ele.monitors.length);
        })
        
      });
     // console.log("km"+kpimonitorsnew);
      const [kipobj, setKipobj] = useState(initialKipobj);
      useEffect(() => {
        const fetchPlantDetails = async () => {
          try {
            let token=await LoginCredentialsAndQueries();
            const requests = prop.plantsData.map(plant =>
            //  let newplantid = plant[0].plantid;
        fetch('https://api.infinite-uptime.com/api/3.0/idap-api/service-requests/analytics?plantIds=' + plant[0].plantid, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
            'accept': "*/*",
          },
        })
        
      );
      const responses = await Promise.all(requests);
      const kpidataList = await Promise.all(responses.map((response) => response.json()));
      //console.log(kpidataList);
      let newcompletedCount='';
      let newdowntime='';
      let newnewCount='';
      
      if(kpidataList){
        kpidataList.map(kpi=>{
          //console.log(kpi);
            if(kpi.data.length>0){
               // console.log(newcompletedCount);
           newcompletedCount=Number(newcompletedCount)+ kpi.data[0].completedCount;
           //console.log(kpi.data[0].completedCount);
           newdowntime=Number(newdowntime)+kpi.data[0].downtime;
           newnewCount=Number(newnewCount)+kpi.data[0].newCount+kpi.data[0].completedCount;
           //console.log(newcompletedCount);
       } 
       else{
        newcompletedCount=Number(newcompletedCount)+ 0;
        //console.log(kpi.data[0].completedCount);
        newdowntime=Number(newdowntime)+0;
        newnewCount=Number(newnewCount)+0;
       }
      })
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
       kpi6: {
        ...kipobj.kpi6,
        title:
        JSON.stringify(kpidisconnected)
      },
        kpi1: {
          ...kipobj.kpi1,
          title:
          JSON.stringify(kpimonitorsnew)
        }
      };
      setKipobj(updatedKipobj);
      }
          else{

            const updatedKipobj = {
        ...kipobj,
        
        kpi2:{
          ...kipobj.kpi2,
          title:
          JSON.stringify(kpimachinesnew)
        },
        kpi6:{
          ...kipobj.kpi6,
          title:
          JSON.stringify(kpidisconnected)
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
            
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPlantDetails();
      }, [prop]);    

      const result = imageUrl.includes("no image available") ||imageUrl=="";
    return(
        <div className="row">
          <div className="col-lg-2 col-sm-4 mb-2">
         
          { !result&& <div className="brand-logo text-center"><img src={imageUrl} alt="Brand Logo" className="img-fluid"/></div>} 
          </div> 
          <div class="col-lg-10">
            <div class="row">
            {Object.keys(kipobj).map(function (ele) {
        return <KPI data={kipobj[ele]} />;
      })}
            </div>
          </div>
      
      
    </div>
    )
}
export default TotalPlants;