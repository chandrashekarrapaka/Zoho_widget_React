import React from "react";
import Machine from "./Machine";

function MG(prop){
    
   let mgarray=()=> prop.mg.map(function(ele){
   // return console.log("mg"+ele.id);
    
   })
   mgarray();
    return(
        
           <Machine machine={prop.mg}/>
        
    )
}
export default MG;