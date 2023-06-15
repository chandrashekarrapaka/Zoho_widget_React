import React from "react";
import Box from "./Box";
import './Container.css';
function Container(props){
    const itirations=[1,2,3,4,5];
    return(
        <div className="wholeContainer">
        <div className="container">
            {
                itirations.map((item,index)=>(<Box/> ))
            }  
        </div>
        <div className="seccon">
        <div className="AA">
            AA
        </div>
        <div className="MFI">
            MFI
        </div>
        </div>
        </div>
    )

}
export default Container;