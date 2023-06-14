import React from "react";
import Box from "./Box";
import './Container.css';
function Container(props){
    const itirations=[1,2,3,4,5];
    return(
        <>
         <div className="contenttop">
            Content v1
            </div>
            <div className="content">
                <h4>Coal Mill</h4>
        <div className="container">
            {
                itirations.map((item,index)=>(<Box/>  ))
            }  
        </div>
        </div>
        </>
    )

}
export default Container;