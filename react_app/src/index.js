import React from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const handleScriptLoad = async() => {
//   console.log("hero")
//   await window.ZOHO.CREATOR.init().then(function(data) {
//    // var queryParams = window.ZOHO.CREATOR.UTIL.getQueryParams();
//    const email="rapaka.chandrashekar@gmail.com";//Stage == \"Open\"
//      var config = {
//       appName: "uat-of-control-room",
//       reportName: "All_Users",
//       criteria: "Username ==\"rapaka.chandrashekar@gmail.com\"",
//       page: "1",
//       pageSize: "100"
//     }

//     //get all records API
//     window.ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
//       //callback block
//       let userData = response;
//       console.log("userData"+JSON.stringify(userData));
      
//     });
//   });
//  // console.log(window.ZC);
 
// };
// handleScriptLoad();
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





