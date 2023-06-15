import React, { useState } from "react";
import './Header.css';
import KPI from './KPI';

const kipobj={
    kpi1:{
        "title":"1","value":"Total Devices Installed"
    },kpi2:{ "title":"2","value":"Total Machines Digitized"},kpi3:{ "title":"3","value":"Total Faults Identified"},kpi4:{ "title":"4","value":"Reports Closed"},kpi5:{ "title":"5","value":"Downtime Saved (Hrs)"}
    
}

function Header(props) {
    const [optionChoose,setOptionChoose]=useState();
    
    return (
        <div className="kpis">
        {/* 5kpi boxes with plant data */}
       {Object.keys(kipobj).map(function(ele){
        return <KPI data={kipobj[ele]}/>
       })}
        
        </div>

    );
}
export default Header;