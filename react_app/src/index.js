import React from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const handleScriptLoad = async() => {
  console.log("hero")
  await window.ZOHO.CREATOR.init().then(function(data) {
   // var queryParams = window.ZOHO.CREATOR.UTIL.getQueryParams();
     var config = {
      appName: "infinite-control-room",
      reportName: "All_Machines",
      criteria: "ID = 166871000001252919",
      page: "1",
      pageSize: "100"
    }

    //get all records API
    window.ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
      //callback block
      let machineData = response.data[0];
      console.log("mname"+JSON.stringify(machineData));
    });
  });
 // console.log(window.ZC);
 
};
handleScriptLoad();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





