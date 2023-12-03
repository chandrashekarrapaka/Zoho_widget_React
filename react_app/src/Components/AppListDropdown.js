import React, { useEffect, useState } from 'react';
import { LoginCredentialsAndQueries } from '../Services/loginCredentialsAndQueries';
import './AppListDropdown.css';
import { loggedInUser } from '../Services/loggedInUser';

const AppListDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [userId,setUserId]=useState('');
  const [data,setData]=useState([]);


  useEffect(() => {
    const fetchDataz = async () => {
      try {
        const response = await LoginCredentialsAndQueries();
        const response2=await loggedInUser();
        if (response.length > 0 && response2.length > 0) {
         // console.log("userid", response2);
          setAccessToken(response);
          setUserId(response2);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataz();
  }, [userId,accessToken]);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const plantsResponse = await fetch(
          `https://api.infinite-uptime.com/api/3.0/idap-api/application-user/subscribed-apps?emailId=${userId}`,
          {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer ' + accessToken,
            },
          }
        );


        const plantsData = await plantsResponse.json();
       // console.log(plantsData);
        if(plantsData!=undefined&&plantsData.data.length>0){
         setData(plantsData.data);
        }
        // Process plantsData as needed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, accessToken]);

  if (data !== undefined && data.length > 0) {
    return (
      <div className="app-list-dropdown-wrap">
        <a href="javascript:void(0)" className="app-list-trigger" onClick={() => setDropdownOpen(!isDropdownOpen)}>
          <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAB7CAAAewgFu0HU+AAADZ0lEQVRIibWWXUwUVxiGn5ndhQEWQRFZiIBKMHXBtBUTCwE1pkmDNTExMWK1bbwxsbUa0xuTXjRN28SmaTX2hqZpbaumMU01Ir0wVuJ/qcGC8qOiCBi18rMus8vO7rI7gxfLHnd2lnhReK/2O+93zjPfOd/OGUnVDAA3cABYC2Tz/+UHLgD7gR5J1YzlwDXAOQOLJ0sFaiVVM5qBt2cBEFeTpGqGn9mpIi6/PRHgGQtx+Fg3Xl+YhvVl1LxWIDLvDao0nrgNEnzQ4KaseI7wbvU+46eTd1HSbOzeVsHCgqxESLakasZkPPr461b6H/mFe2h/NSWFTsa1CDs+uYg+leqwyxz5cg2Zip3RsRA7P70s5uTlKvzwWZ2pFDkxSAQAPB4OAOALRAQAIBI1CASjAIx6Q6Y5njFzbIFsqS8Tv0uLnLz+ynwACvMzeePVBcKrXeEif64CQHlJDpXl84RXX1dsgZi2C+BG9yjjWoS6KheyLJmSr/z7VECSdantPxwOG9UJDzMtZDYkJw9owSheXzhl8ph/An8gktLz+sJooWhKz54YXO8c4bvjXYQmdDa9uZit61+c0anzA/z2Zx92u8SuLW7qql5s2bEz9zndMkCGYmfP9gpWVuRPX8lXP3YQCEbR9Ul+P/uAvoc+AB4PBTjadI+obhAK6xz8tVM89d0BlZN/9aMbk4xrEb75udNSiQkymXQ68bY1kg2AqSEj6Uh13Zprgux7bzkOe2xow9oSli7KAaDY5WTzW0tiE2SJXQ1uMjNiO71sSa5o2zSHzN53Ky0QS3d5fWEmIgYFeRmW5GFPEJtNIi9XsXhPR4Mo6TZys9NeDpkNWVq4445H/OmS9ffNIVpvDaf0rrYP0dY1ktIzVfLHuX6ON98HoLw0h88/qiLNYQPg2186BXzdqiJ2v1MBxA7+i+/b6bjjAWDjulLe37h0+kriAIi92tunJj4Z1kzVtfzzRLwIewdVAQA43TJoqcQEWegy3QO48jIBcGY5TOM2WSJDiXXXvJx0kzd3jjmG2HaJm3HIE+TQ0S5Uf5iG+jJWrywUiT19XhpP3EaSJD7c6hbtDdDWPcKRU70o6Tb2bKuktMh00folVTPOABss+JlTk6RqhhtoZWY+hZLlA6ploAeoBpoBbYYW16bWqwF6ngNhu1ZKA5d7lQAAAABJRU5ErkJggg==" />
        </a>
        <div className={`app-list-dropdown ${isDropdownOpen ? 'open' : ''}`}>
          <ul className="app-list-items">
            {data.map(element => (
              <li className="app-list-item" key={element.id}>
                <a className="app-list-link" href={element.rootUrl}>
                  <img alt="" src={element.logo} />
                  <span>{element.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <a className="app-list-btn" href="#">
            PlantOS App Suite
          </a>
        </div>
      </div>
    );
  }

  return null; // If no displayApps are provided, render nothing
};

export default AppListDropdown;
