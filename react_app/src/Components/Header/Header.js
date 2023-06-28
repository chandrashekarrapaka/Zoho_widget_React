import React, { useState, useEffect } from "react";
import "./Header.css";
import KPI from "./KPI";
import { Image } from "../../Services/image";

const initialKipobj = {
    kpi1: {
      title: "1",
      value: "Total Devices Installed",
    },
    kpi2: { title: "2", value: "Total Machines Digitized" },
    kpi3: { title: "3", value: "Total Faults Identified" },
    kpi4: { title: "4", value: "Reports Closed" },
    kpi5: { title: "5", value: "Downtime Saved (Hrs)" },
  };
  
function Header(prop) {
  const [imageUrl, setImageUrl] = useState("");
  const [kipobj, setKipobj] = useState(initialKipobj); // Initialize with the initial kipobj value
  let kipobjz = {
    kpi1: {
      title: "1",
      value: "Total Devices Installed",
    },
    kpi2: { title: "2", value: "Total Machines Digitized" },
    kpi3: { title: "3", value: "Total Faults Identified" },
    kpi4: { title: "4", value: "Reports Closed" },
    kpi5: { title: "5", value: "Downtime Saved (Hrs)" },
  };
  
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
        const data = await window.ZOHO.CREATOR.init();
        const plantid = prop.currentPlant[0].plantid;
        const config = {
          appName: "infinite-control-room",
          reportName: "All_Plants",
          criteria: `plantId == "${plantid}"`,
          page: "1",
          pageSize: "100",
        };

        const response = await window.ZOHO.CREATOR.API.getAllRecords(config);
        const plantdetails = response.data[0];
        const plantidCre = plantdetails.ID;
        console.log(
          "plantidCre" +
            plantidCre +
            " " +
            plantdetails.Close_Reports +
            " " +
            plantdetails.Down_Time +
            " " +
            (Number(plantdetails.Close_Reports) +
              Number(plantdetails.Number_of_Fault_Identifier))
        );
        const configz = {
            appName: "infinite-control-room",
            reportName: "All_Machines",
             criteria: `Plants.contains("${plantidCre}")`,
             //criteria: `Machine_ID == "${4260}"`,
            page: "1",
            pageSize: "100",
          };
  
          const machine = await window.ZOHO.CREATOR.API.getAllRecords(configz);
          const machinedetails = machine.data.length;
          console.log("kpimachine"+machinedetails)
        //   const plantidCre = plantdetails.ID;//Total_Device_Installed
        const configd = {
            appName: "infinite-control-room",
            reportName: "Total_Device_Installed_Report",
             criteria: `Name_of_Plant.contains("${plantidCre}")`,
             //criteria: `Machine_ID == "${4260}"`,
            page: "1",
            pageSize: "200",
          };
  
          const totaldevices = await window.ZOHO.CREATOR.API.getAllRecords(configd);
          let totaldevicesinstalled = totaldevices.data.length;
          console.log("totaldevicesinstalled"+totaldevicesinstalled)
          if(totaldevicesinstalled==200){
            const configd = {
                appName: "infinite-control-room",
                reportName: "Total_Device_Installed_Report",
                 criteria: `Name_of_Plant.contains("${plantidCre}")`,
                 //criteria: `Machine_ID == "${4260}"`,
                page: "2",
                pageSize: "200",
              };
      
              const totaldevices = await window.ZOHO.CREATOR.API.getAllRecords(configd);
               totaldevicesinstalled = 200+totaldevices.data.length;
      
          }

        const updatedKipobj = {
          ...kipobj,
          kpi4: {
            ...kipobj.kpi4,
            title: plantdetails.Close_Reports,
          },
          kpi5: {
            ...kipobj.kpi5,
            title: plantdetails.Down_Time,
          },
          kpi3: {
            ...kipobj.kpi3,
            title:
              Number(plantdetails.Close_Reports) +
              Number(plantdetails.Number_of_Fault_Identifier),
          },
          kpi2: {
            ...kipobj.kpi2,
            title:
             machinedetails
          },//totaldevicesinstalled
          kpi1: {
            ...kipobj.kpi1,
            title:
            totaldevicesinstalled
          }
        };

        setKipobj(updatedKipobj);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlantDetails();
  }, [prop.currentPlant]);

  return (
    <div className="kpis">
      <img src={imageUrl} alt="Plant" />
      {/* <div className="PlantName"></div> */}
      {/* 5kpi boxes with plant data */}
      {Object.keys(kipobj).map(function (ele) {
        return <KPI data={kipobj[ele]} />;
      })}
    </div>
  );
}

export default Header;
