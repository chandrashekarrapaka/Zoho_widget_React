import Header from './Components/Header';
import './App.css';
import Container from './Components/Container';
import { Plants } from './Services/Json';
import { useState ,  useEffect } from 'react';
        
function App() {
  const options=[
    "Select...","A","B","C","D"
];
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await Plants(); 
      console.log("ub"+response);
      
    } catch (error) {
      console.error(error);
    
    }
  };

  fetchData(); 
}, []);

// (async () => {
//   if (!params) {
//     await ZOHO.CREATOR.init();
//     setWidgetStatus((old) => ({ ...old, status: 'initialized' }));
//     setParams(await ZOHO.CREATOR.UTIL.getQueryParams());
//   }
// })();
  return (
    <div>
  <Header options={options} />
  <Container/>
  </div>

  );
}

export default App;
