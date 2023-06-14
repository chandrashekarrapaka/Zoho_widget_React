import React from "react";
import './TinySignal.css'

function TinySignal(props) {
 const boxzz =[1,2,3,4,5];
    return (
        <div>
        {
            boxzz.map((item,index) => {
                return(
                    <span key={index} style={{"background":"green"}} className="boxzz"></span>
                )
            }
         
            )}
       </div>
    );
}
export default TinySignal;