let intervalId;

export async function Plants() {
  let accessToken = "";
  const arrayOfPlants = [];
  const arrayOfMachines = [];
  const drsRequests = {};
  let apicallstatus = true;

  try {
    const loginResponse = await window.ZOHO.CREATOR.init().then(function (data) {
      let accessTokenz = "";
      let userid = window.ZOHO.CREATOR.UTIL.getQueryParams().user;

      var config = {
        appName: "thk-control-room",
        reportName: "My_Profile_Data",
        criteria: "Username == \"" + userid + "\"",
        page: "1",
        pageSize: "100"
      };

      const access = window.ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
        let userData = response;
        accessTokenz = userData.data[0].Access_Token;
        return accessTokenz;
      });

      return access;
    });

    const queryParams = await window.ZOHO.CREATOR.init().then(function (data) {
      return window.ZOHO.CREATOR.UTIL.getQueryParams();
    });

    const loginData = await loginResponse;
    accessToken = loginData;

    let orgid = queryParams.PlantId.split(",")[1];
    const orgidAll = queryParams.PlantId.split(",");

    const fetchPlantsData = async () => {
      ////console.log("functioncalled"+new Date().getMinutes);
      try {
        await Promise.all(orgidAll.map(async (orgid) => {
          const plantsResponse = await fetch(`https://uat-new-api-idap.infinite-uptime.com/3.0/plants/${orgid}/machine-group-stats`, {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer ' + accessToken,
            },
          });

          if (plantsResponse.status === 401) {
            apicallstatus = false;
            // Stop further API calls
            // clearInterval(intervalId);
            //console.log("apicallstatus: " + apicallstatus);
            return [[]], apicallstatus;
          }

          const plantsData = await plantsResponse.json();
          const plantsArray = [];
          const serviceRequestsIds = {
            plant_ids: new Array,
            machine_ids: new Array,
          };
           console.log(plantsData);
          
              

         
          plantsData.data.areas.forEach((area) => {
            area.machineGroups.forEach((mg) => {
              mg.machines.forEach((machine)=>{
              machine.mg = mg.name;
              machine.plantName = plantsData.data.name;
              machine.plantid = plantsData.data.id;
              plantsArray.push(machine);
              if (!(
                typeof serviceRequestsIds.plant_ids != typeof undefined &&
                serviceRequestsIds.plant_ids.length > 0 &&
                serviceRequestsIds.plant_ids.includes(plantsData.data.id)
              )) {
                serviceRequestsIds.plant_ids.push(plantsData.data.id);
              }

              if (!(
                typeof serviceRequestsIds.machine_ids != typeof undefined &&
                serviceRequestsIds.machine_ids.length > 0 &&
                serviceRequestsIds.machine_ids.includes(machine.id)
              )) {
                serviceRequestsIds.machine_ids.push(machine.id);
              }
            });
          });
        }); plantsData.data.areas.forEach((area) => {
          area.machineGroups.forEach((mg) => {
            mg.machines.forEach((machine)=>{
            machine.mg = mg.name;
            machine.plantName = plantsData.data.name;
            machine.plantid = plantsData.data.id;
            plantsArray.push(machine);
            if (!(
              typeof serviceRequestsIds.plant_ids != typeof undefined &&
              serviceRequestsIds.plant_ids.length > 0 &&
              serviceRequestsIds.plant_ids.includes(plantsData.data.id)
            )) {
              serviceRequestsIds.plant_ids.push(plantsData.data.id);
            }

            if (!(
              typeof serviceRequestsIds.machine_ids != typeof undefined &&
              serviceRequestsIds.machine_ids.length > 0 &&
              serviceRequestsIds.machine_ids.includes(machine.id)
            )) {
              serviceRequestsIds.machine_ids.push(machine.id);
            }
          });
        });
      });
        

          arrayOfMachines.push(plantsArray);
          arrayOfPlants.push(plantsData.data);

          if (serviceRequestsIds.plant_ids.length > 0 && serviceRequestsIds.machine_ids.length > 0) {
            const serviceRequests = await fetch(`https://uat-new-api-idap.infinite-uptime.com/3.0/service-requests?plantIds=${serviceRequestsIds.plant_ids.join('&plantIds=')}&machineIds=${serviceRequestsIds.machine_ids.join('&machineIds=')}`, {
              method: 'GET',
              headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
              }
            });

            if (serviceRequests.status === 200) {
              const serviceRequestData = await serviceRequests.json();

              for (const plantId in serviceRequestData.data) {
                serviceRequestData.data[plantId].forEach(async (v, index) => {
                  if (v.serviceReqMachineDetails.length > 0) {
                    v.serviceReqMachineDetails.forEach(async (m, index) => {
                      if (!drsRequests[plantId]) {
                        drsRequests[plantId] = {};
                      }

                      if (!drsRequests[plantId][m.machineId]) {
                        drsRequests[plantId][m.machineId] = {};
                      }

                      if (!drsRequests[plantId][m.machineId][m.monitorId]) {
                        drsRequests[plantId][m.machineId][m.monitorId] = 'COMPLETED';
                      }

                      if (drsRequests[plantId][m.machineId][m.monitorId] != 'NEW') {
                        if (!drsRequests[plantId][m.machineId]['status']) {
                          drsRequests[plantId][m.machineId]['status'] = 'COMPLETED';
                        }

                        drsRequests[plantId][m.machineId][m.monitorId] = m.serviceStatus;

                        if (m.serviceStatus == 'NEW') {
                          drsRequests[plantId][m.machineId]['status'] = 'NEW';
                        }
                      }
                    });
                  }
                });
              }
            }
          }
        }));
      } catch (error) {
        throw error;
      }
    };

    await fetchPlantsData();


    //intervalId = setInterval(fetchPlantsData, 30000);

    return [arrayOfMachines, apicallstatus, drsRequests];

  } catch (error) {
    //console.error(error);
    throw error;
  }
}


Plants()
  .then(([machines, status, drsRequests]) => {
    //console.log("Machines:", machines);
    //console.log("API Call Status:", status);
  })
  .catch((error) => {
    //console.log("Error:", error);
  });
