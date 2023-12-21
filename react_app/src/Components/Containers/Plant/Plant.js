import React from "react";
import MG from "./MG";

function Plant(prop){
   // console.log("plant.js"+JSON.stringify(prop.currentItems.length))
// //     margin: auto;
//   width: 50%;
//   border: 3px solid green;
//   padding: 10px;
    return(
        < >
           {prop.currentItems.length?<MG mg={prop.currentItems} plantDrsStatus={prop.plantDrsStatus}/>:<div className="center-screen"><h1>{`Next Plant >>>  ${prop.NextPlant}`}</h1></div>} 
        </>
    
    )
}
export default Plant;