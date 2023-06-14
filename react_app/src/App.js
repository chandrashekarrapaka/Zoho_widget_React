import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Container from './Components/Container';
import { Plants } from './Services/Json';

function App() {
  const [options, setOptions] = useState([]);
  const [plantID,setPlantID]=useState();
  const boxes={
    
  }
    
    function handleSelectChange(e){
      setPlantID(e.target.value);
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Plants();
        const plantNames = response.map((ele) => ele.plantName);
        setOptions(plantNames);
        console.log(options);
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
  <Header options={options} handleSelectChange={handleSelectChange}/>
  <Container boxes={boxes}/>
  </div>

  );
}

export default App;
