import {useState, useEffect} from 'react';
import './App.css';
import Header from './components/header.js';
import DataInput from './components/data-input.js';
import DataTable from './components/data-table.js';

function App() {
  const [temps, setTemps] = useState([]);
  const [formData, setFormData] = useState([])
  const [readyToCalculate, setReadyToCalculate] = useState(false);

  useEffect(() => {
    const fetchTempData = async () => {
      const response = await fetch("/temps.json");
      const tempData = await response.json();
      setTemps(tempData);
    }
    fetchTempData();
  }, [])

  function formReset(){
    window.location.reload();
  }

  return (
    <div className="main-container">
      <div className="container">
        <Header />
        <br />
        <div className="row">
          <DataInput temps={temps} setFormData={setFormData} setReadyToCalculate={setReadyToCalculate} formReset={formReset}/>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        {readyToCalculate ? 
       <DataTable formData={formData}/>
       :
       <div></div>}
      </div>
    </div>
  );
}

export default App;
