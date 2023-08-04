import React from "react";
//import './KPI.css';


function KPIofPlant(prop) {

	//console.log(prop.data.title);
	return (
		<div class="col-lg col-sm-4 mb-3">
			<div class="about-brand-box">
				<div class="left-content">
					<p class="mb-0 fs-12 text-black">
					{prop.data.title}
					</p>
					<p class="mb-0 text-black fs-4 fw-800">
					{prop.data.value}
					</p>
				</div>
				<div class="right-content-box">
					<img src={prop.data.src} alt="Broadcasting icon" class="img-fluid"/>
				</div>
			</div>
		</div>
	)
}
export default KPIofPlant;