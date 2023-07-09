import React from "react";
import './KPI.css';

function KPI(prop){

//console.log(prop.data.title);
return(
	<>
    {prop.data.symbol==`&#xe1b1;`?
    <div className="kpiItems" style={{"height": "inherit"}}>
	<div  className="device_kpi " style={{color:"#296eab"}}>
	<i className={prop.data.class}  >&#xe1b1;</i>{prop.data.title}</div>
	<div className="device_title"><center>{prop.data.value}</center></div>
</div>:<div className="kpiItems" style={{"height": "inherit"}}>
	<div  className="device_kpi " style={{color:"#296eab"}}>
	<i className={prop.data.class}  ></i>{prop.data.title}</div>
	<div className="device_title"><center>{prop.data.value}</center></div>
</div>
	}
	</>
)
}
export default KPI;