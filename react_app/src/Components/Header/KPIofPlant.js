import React from "react";
//import './KPI.css';


function KPIofPlant(prop) {

	//console.log(prop.data.title);
	return (
		<div class="col-lg col-sm-4 mb-2">
			<div class="about-brand-box">
				<div class="left-content">
					<p class="mb-0 fs-11 text-black">
					{prop.data.value}
					</p>
					<p class="mb-0 text-black fs-4 fw-800">
					{prop.data.title}
					</p>
				</div>
				{prop.data.src?<div class="right-content-box">
			<img src={prop.data.src} alt="Broadcasting icon" class="img-fluid"/>
		</div>:""}
			</div>
		</div>
	)
}
export default KPIofPlant;