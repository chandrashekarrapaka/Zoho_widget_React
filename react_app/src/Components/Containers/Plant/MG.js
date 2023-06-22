import React from "react";
import Machine from "./Machine";
import './MG.css'
function MG(prop){
    
   let mgarray=()=> prop.mg.map(function(ele){
    return console.log("mg"+ele.id);
    
   })
   mgarray();
    return(
        <div className="MG">
           
            {
                prop.mg.map(function(ele){
                    return( 
                        <div className="machinesWapper" style={{textAlign:"center"}}>
                        <h4>{ele.name}</h4>
                    <Machine machine={ele.machines}/>
                      </div>
                    )
                })
                
            }     
            
        </div>
    )
}
export default MG;