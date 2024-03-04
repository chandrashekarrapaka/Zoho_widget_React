export async function Plants() {
    let accessToken = "";
  
    const handleScriptLoad = async () => {
      console.log("hero");
  
      const data = await window.ZOHO.CREATOR.init();
      const config = {
        appName: "uat-of-control-room",
        reportName: "All_Users",
        criteria: 'Username == "rapaka.chandrashekar@gmail.com"',
        page: "1",
        pageSize: "100",
      };
  
      return new Promise((resolve, reject) => {
        window.ZOHO.CREATOR.API.getAllRecords(config)
          .then(function (response) {
            let userData = response;
            accessToken = JSON.stringify(userData.data[0].Access_Token);
            console.log("userData" + JSON.stringify(userData.data[0].Access_Token));
            resolve(accessToken);
          })
          .catch(reject);
      });
    };
  
    accessToken = await handleScriptLoad();
  
    try {
      console.log("type"+typeof accessToken);
      // accessToken=`eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyY0NxRnpxRXJrNU5GS1RjTi1YSk1IdE9NS2tWVTZXS1hIdHZFMF8xZE5ZIn0.eyJleHAiOjE2ODY5NTA0NTAsImlhdCI6MTY4NjkwNzI1MCwianRpIjoiNzBhZjRhZTMtNThmMy00YzM5LWI4MjEtYzI4N2FkOWQ2N2NiIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5pbmZpbml0ZS11cHRpbWUuY29tL3JlYWxtcy9pZGFwIiwic3ViIjoiZjo2MGNhNzY4Yy1iMTA0LTQ0OTktYjU4Yy05MzliOTdlNzAzM2Q6ODcxMSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImlkYXAiLCJzZXNzaW9uX3N0YXRlIjoiZWRlZGU1ZDAtOTM3Yi00NzIzLWI3ZGItNTZlM2UxYzdkNDhlIiwic2NvcGUiOiJlbWFpbCIsInNpZCI6ImVkZWRlNWQwLTkzN2ItNDcyMy1iN2RiLTU2ZTNlMWM3ZDQ4ZSIsImlzX2FkbWluIjoiZmFsc2UiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlkYXBfcm9sZSI6IlJPTEVfVVNFUiIsImVtYWlsIjoiUmFwYWthLmNoYW5kcmFzaGVrYXJAZ21haWwuY29tIn0.rpQ3HWOHhRAoFgv8WqDIjZZX_6muM3J17fPBZDhMT621l7tZZs1yldw7MVsCnmfFpBzoExhmxHlDBV3OKxsQQylhM4n1L34poGPN7x7DAFoE70u2t2YqOwroAH2tXcRgTbWbhQhznsGIvYNLGcsQSwiNX9aCKyfC6qSaD2n4vL6oIcZq8Z7OIVjnpBy2cfp_nMfYWTBkX_ZyMRCMf2yAEgKfgng7RsjQSWUUtONeonbBgIwmLqVbDLHP135XPG3rQ7z72JRjLcmLZyPtGpONMyZShUV6uIFcZe0ugB9mrOMEMBK_ZoiaKNVKBnb8kuO1F9Yd5fwe5MktOSK5GgkrAg`;
         const plantsResponse = await fetch(
        "https://api-idap.infinite-uptime.com/api/3.0/idap-api/plants/1868/machine-group-stats",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );
  
      const plantsData = await plantsResponse.json();
      console.log("plantsdata", plantsData);
  
      return plantsData.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  