export async function Plants() {
    const username = encodeURIComponent('rapaka.chandrashekar@gmail.com');
    const password = encodeURIComponent('chanduR00002@');
    let accessToken = "";
  
    try {
      const loginResponse = await fetch(`https://api-idap.infinite-uptime.com/api/3.0/idap-api/login?username=${username}&password=${password}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
      });
  
      const loginData = await loginResponse.json();
      accessToken = loginData.accessToken;
      console.log(accessToken);
  
      const plantsResponse = await fetch('https://api-idap.infinite-uptime.com/api/3.0/idap-api/plants', {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': 'Bearer ' + accessToken,
        },
      });
  
      const plantsData = awa