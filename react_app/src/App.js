import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Container from './Components/Container';
import { Plants } from './Services/Json';
import { LoadScript } from 'react-load-script';


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
      {/* <LoadScript
        url="https://js.zohostatic.com/creator/widgets/version/1.0/widgetsdk-min.js"
        onLoad={handleScriptLoad}
      /> */}
      <Header options={options} handleSelectChange={handleSelectChange} />
      <Container boxes={boxes} />
    </div>
  );
}

export default App;
