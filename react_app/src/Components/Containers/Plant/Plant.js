import React from "react";
import MG from "./MG";
import './Plant.css';
function Plant(prop){
    console.log("plant.js"+JSON.stringify(prop.currentItems.length))
// //     margin: auto;
//   width: 50%;
//   border: 3px solid green;
//   padding: 10px;
    return(
        <div className="plant">
           {prop.currentItems.length?<MG mg={prop.currentItems}/>:<div className="center-screen"><h1>{`Next Plant >>>  ${prop.NextPlant}`}</h1></div>}
            
        </div>
    
    )
}
export default Plant;