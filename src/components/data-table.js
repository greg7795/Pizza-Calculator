import {useEffect, useState, useRef} from 'react';

export default function DataTable({formData}){

  
  const HAND_MIX_FACTOR = 5;
  const MIXER_FACTOR = 20;

  const [yeastData, setYeastData] = useState([]);

  const flourTotal = useRef(0);
  const waterTotal = useRef(0);
  const waterTemp = useRef(0);
  const saltTotal = useRef(0);
  const yeastTotal = useRef(0);

  console.info("DataTable render:");
  
  useEffect(() => {
    console.info("useEffect");
    const fetchYeastData = async () => {
      console.info("fetching yeast");
      const response = await fetch("/yeast.json");
      const yeast = await response.json();
      setYeastData(yeast);
      console.info(yeast);
    }
    fetchYeastData();
    
  
  }, [])


  function calculateResult(){
    if(yeastData.length){
      console.info("Calc Reult with yeast data")
      flourTotal.current = calculateTotalFlour();
      waterTotal.current = calculateTotalWater();
      waterTemp.current = calculateWaterTemp();
      saltTotal.current = calculateTotalSalt();
      yeastTotal.current = calculateYeastTotal();
    } else {
      console.info("No yeast data yet");
    }
  }

  calculateResult();

  function calculateTotalFlour(){

    let pizzaWeight = parseInt(formData["pizzaWeight"]);
    let hydration = parseFloat(formData["hydrationPercentage"] / 100);
    let salt = parseFloat(formData["saltPercentage"] / 100);
    let yeast = yeastData.find((y) => y.type === formData["yeastType"]);
    let yeastPercentage = yeast.percentages[formData["fermentationHours"][1]] / 100;
    let pizzas = parseInt(formData["numberOfPizzas"]);

    return Math.round((pizzaWeight / (1 + hydration + salt + yeastPercentage)) * pizzas);
    
  }

  function calculateTotalWater(){
    return Math.round(flourTotal.current * parseFloat(formData["hydrationPercentage"] / 100));
  }

  function calculateWaterTemp(){

    let mixFactor = formData["mixType"] === "By Hand" ? HAND_MIX_FACTOR : MIXER_FACTOR;
    let fdt = parseInt(formData["finalDoughTemp"]);
    let roomTemp = parseInt(formData["roomTemp"]);
    return Math.round((fdt * 3) - (roomTemp * 2) - mixFactor); 

  }

  function calculateTotalSalt(){
    return flourTotal.current * parseFloat(formData["saltPercentage"] / 100).toFixed(2);
  }

  function calculateYeastTotal(){
    let yeast = yeastData.find((y) => y.type === formData["yeastType"]);
    let yeastPercentage = yeast.percentages[formData["fermentationHours"][1]] / 100;
    return (flourTotal.current * yeastPercentage).toFixed(4);

  }

    return (
        <div className="row">
        <table class="table">
          <thead>
            <tr class="table-primary">
              <th>Flour (g)</th>
              <th>Water (g)</th>
              <th>Water Temp (F)</th>
              <th>Salt (g)</th>
              <th>Yeast (g)</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-secondary">
              <td>{flourTotal.current}</td>
              <td>{waterTotal.current}</td>
              <td>{waterTemp.current}</td>
              <td>{saltTotal.current}</td>
              <td>{yeastTotal.current}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}