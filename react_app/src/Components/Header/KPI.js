import React from "react";



function KPI(prop){

//console.log(prop.data.title);
return(
	<div class="col-lg-2 col-sm-4 mb-2">
	<div class="about-brand-box">
		<div class="left-content">
			<p class="mb-0 fs-13 text-white">
			{prop.data.value}
			</p>
			<p class="mb-0 text-white fs-4 fw-800">
			{prop.data.title}
			</p>
		</div>
		<div class="right-content-box">
			<img src={prop.data.src} alt="Broadcasting icon" class="img-fluid"/>
		</div>
	</div>
</div>
)
}
export default KPI;