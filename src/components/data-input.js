
import {useState, useEffect} from 'react';

export default function DataInput({temps, setFormData, setReadyToCalculate, formReset}){

    const [selectedTemp, setSelectedTemp] = useState(-1);
    const [hoursOptions, setHoursOptions] = useState([]);
    const [inputData, setInputData] = useState(initializeInputData());

    useEffect(() =>{
        if(selectedTemp > 0){
            const tempUsed = temps.find((t) => t.tempF == selectedTemp)
            setHoursOptions(tempUsed.hours.filter((f) => f > 0 ));
        }
    }, [selectedTemp])

    function initializeInputData(){
        return {
            "numberOfPizzas": null,
            "pizzaWeight": null,
            "hydrationPercentage": null,
            "saltPercentage": null,
            "roomTemp": null,
            "mixType": null,
            "fermentationTemp": null,
            "fermentationHours": [null, null],
            "yeastType": null,
            "finalDoughTemp": null
        }
    }
        
    function handleChange(event){
        const tempInputData = inputData;
        switch(event.target.id){
            case "numberOfPizzas":
                tempInputData["numberOfPizzas"] = event.target.value;
                break;
            case "pizzaWeight":
                tempInputData["pizzaWeight"] = event.target.value;
                break;
            case "hydrationPercentage":
                tempInputData["hydrationPercentage"] = event.target.value;
                break;
            case "saltPercentage":
                tempInputData["saltPercentage"] = event.target.value;
                break;
            case "roomTemp":
                tempInputData["roomTemp"] = event.target.value;
                break;
            case "mixType":
                tempInputData["mixType"] = event.target.value;
                break;
            case "yeastType":
                tempInputData["yeastType"] = event.target.value;
                break;
            case "fermentationTemp":
                tempInputData["fermentationTemp"] = event.target.value;
                setSelectedTemp(event.target.value);
                break;
            case "fermentationHours":
                let fermTemp = temps.find(t => t.tempF == inputData["fermentationTemp"]);
                let index = fermTemp.hours.indexOf(parseInt(event.target.value));
                tempInputData["fermentationHours"] = [event.target.value, index];
                break;
            case "fdt":
                tempInputData["finalDoughTemp"] = event.target.value;
                break
            default:
                console.info("Error setting the data");
                console.dir(event.target.id);
        }
        setInputData(tempInputData);
    }

    function formSubmit(){
      setFormData(inputData);
      setReadyToCalculate(true); 
    }

    return (
        <div>
        <form>
            <div className="mb-3">
              <label htmlFor="numberOfPizzas" className="form-label">Number of Pizzas</label>
              <input 
                type="text" 
                className="form-control" 
                id="numberOfPizzas"
                onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="pizzaWeight" className="form-label">Dough Ball Weight in Grams</label>
              <input 
                type="text" 
                className="form-control" 
                id="pizzaWeight" 
                onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="hydration" className="form-label">Hydration Percentage</label>
              <input 
                type="text" 
                className="form-control" 
                id="hydrationPercentage"
                onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="saltPercentage" className="form-label">Salt Percentage</label>
              <input 
                type="text" 
                className="form-control" 
                id="saltPercentage"
                onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="roomTemp" className="form-label">Room Temperature</label>
              <input 
                type="text" 
                className="form-control" 
                id="roomTemp"
                onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="mixType" className="form-label">Mix Technique</label>
              <select 
                className="form-select" 
                id="mixType" 
                onChange={handleChange} >
                <option value="Select One">Select Mix Technique</option>
                <option value="Stand Mixer">Stand Mixer</option>
                <option value="By Hand">By Hand</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="yeastType" className="form-label">Yeast Type</label>
              <select 
                className="form-select" 
                id="yeastType" 
                onChange={handleChange} >
                <option value="Select One">Select Yeast Typte</option>
                <option value="Active Dry">Active Dry</option>
                <option value="Instant Dry">Instant Dry</option>
                <option value="Fresh">Fresh</option>
              </select>
            </div>
            <div className="mb-3">
             <label htmlFor="fermentationTemp" className="form-label">Fementation Temperature (F)</label>
              <select 
                className="form-select" 
                id="fermentationTemp" 
                onChange={handleChange} >
                <option value="Select One">Select A Temp</option>
                {temps.map((t) => <option value={t.tempF} key={t.tempF}>{t.tempF}</option> )}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="fermentationHours" className="form-label">Fermentation Hours</label>
              <select 
                className="form-select" 
                id="fermentationHours" 
                onChange={handleChange}>
                <option value="Select One">Select Hours</option>
                {hoursOptions.map((o) => <option value={o} key={o}>{o}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="fdt" className="form-label">Final Dough Temp (F)</label>
              <input 
                type="text" 
                className="form-control" 
                id="fdt"
                onChange={handleChange} />
            </div>
          </form>
          <div class="row justify-content-evenly">
            <div class="col-4">
              <button 
                  type="submit" 
                  class="btn btn-primary"
                  onClick={formSubmit}>Calculate
              </button>
            </div>
            <div class="col-4">
              <button 
                  type="submit" 
                  class="btn btn-primary"
                  onClick={formReset}>Reset
              </button>
            </div>
          </div>
        </div>
          
    )
}