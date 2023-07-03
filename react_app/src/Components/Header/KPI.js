import React from "react";
import './KPI.css';

function KPI(prop){

console.log(prop.data.title);
return(
    
    <div className="kpiItems" style={{"height": "inherit"}}>
	<div  className="device_kpi ">
	<i className={prop.data.class} style={{color:"blue"}} ></i>{prop.data.title}</div>
	<div className="device_title"><center>{prop.data.value}</center></div>
</div>
    
)
}
export default KPI;