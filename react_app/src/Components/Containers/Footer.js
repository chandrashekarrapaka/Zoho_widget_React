const Footer=()=>{
    
    return(

        <div className="health-score-sec">
        <div className="row">
          <div className="col-lg-3 mb-2 col-md-6 col-sm-6">
            <div className="health-score-box py-2 px-3">
              <div className="score-box green"></div>
              <p className="text-dark fs-14 mb-0 fw-bold">Health Score {'>'} 80%</p>
            </div>
          </div>

          <div className="col-lg-3 mb-2 col-md-6 col-sm-6">
            <div className="health-score-box py-2 px-3">
              <div className="score-box yellow"></div>
              <p className="text-dark fs-14 mb-0 fw-bold">Health Score {'>'} 50% {'<'} 80%
              </p>
            </div>
          </div>

          <div className="col-lg-3 mb-2 col-md-6 col-sm-6">
            <div className="health-score-box py-2 px-3">
              <div className="score-box red"></div>
              <p className="text-dark fs-14 mb-0 fw-bold">Health Score {'<'} 50% 
              </p>
            </div>
          </div>

          <div className="col-lg-3 mb-2 col-md-6 col-sm-6">
            <div className="health-score-box py-2 px-3">
              <div className="score-box text-bg-secondary"></div>
              <p className="text-dark fs-14 mb-0 fw-bold " >Health Score unavailable
              </p>
            </div>
          </div>
        </div>
      </div>
        
    );
}
export default Footer;