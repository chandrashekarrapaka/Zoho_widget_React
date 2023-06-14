
const apiUrl = 'https://api-idap.infinite-uptime.com/api/3.0/idap-api/login';

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'rapaka.chandrashekar@gmail.com',
    password: 'chanduR00002@'
  })
})
  .then(response => response.json())
  .then(data => {
    // Handle the response here
    console.log(data);
  })
  .catch(error => {
    // Handle any error that occurred
    console.error(error);
  });