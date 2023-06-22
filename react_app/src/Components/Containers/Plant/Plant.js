import React from "react";
import MG from "./MG";
import './Plant.css';
function Plant(prop){
    console.log("plant.js"+JSON.stringify(prop.currentItems.length))
  
    return(
        <div className="plant">
           {/* <div className="pname"> {plantData.name}</div> */}
            <MG mg={prop.currentItems}/>
        </div>
    
    )
}
export default Plant;