import React, { useEffect, useState } from 'react';
import Header from './Components/Header/Header';
import Container from './Components/Containers/Container';
import { Plants } from './Services/Json';



function App() {
  const [options, setOptions] = useState([]);
  const [plantID, setPlantID] = useState();
  const boxes = {};
  
  function handleSelectChange(e) {
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

  

  return (
    <div>
      <Header options={options} handleSelectChange={handleSelectChange} />
      <Container boxes={boxes} />
    </div>
  );
}

export default App;
