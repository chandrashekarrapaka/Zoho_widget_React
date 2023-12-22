
export async function loggedInUser() {
    let userid="";
    
      try {
         
        const loginResponse =  await window.ZOHO.CREATOR.init().then(function(data) {
          userid=window.ZOHO.CREATOR.UTIL.getQueryParams().user;
          
        return userid;
        });
        return userid;
      }
      
       catch (error) {
        console.error(error);
        throw error;
      }
    }
    