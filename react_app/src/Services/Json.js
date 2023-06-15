
// export async function Plants() {
//     const username = encodeURIComponent('rapaka.chandrashekar@gmail.com');
//     const password = encodeURIComponent('chanduR00002@');
//     let accessToken = "";
  
//     try {
//       const loginResponse = await fetch(`https://api-idap.infinite-uptime.com/api/3.0/idap-api/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type':'application/json',
//           'accept': 'application/json',
//         },
//         body: JSON.stringify({
//           username: 'rapaka.chandrashekar@gmail.com',
//           password: 'chanduR00002@'
//         })
//       });
//       console.log("json.js called1");
  
//       const loginData = await loginResponse.json();
//       accessToken = loginData.data.accessToken;
//        //console.log(loginData);
  
//       const plantsResponse = await fetch('https://api-idap.infinite-uptime.com/api/3.0/idap-api/plants', {
//         method: 'GET',
//         headers: {
//           'accept': '*/*',
//           'Authorization': 'Bearer ' + accessToken,
//         },
//       });
  
//       const plantsData = await plantsResponse.json();
//     //   console.log("plantsdata", plantsData);
  
//       return plantsData.data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
  