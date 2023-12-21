import { useState } from 'react';
import './App.css';
import {
  splitStringToArray, 
  formatArrayToMatrix, 
} from './utils/dataUtils';
import DataTable from './components/DataTable';
import FilterByProjects from './components/FilterByProjects';
import FinalTable from './components/FindWorkerPairs';




function App() {

const [data, setData] = useState([]);


function handleFileUpload(e){
  const file = e.target.files[0];
  const reader = new FileReader();
  const errors = [];

  reader.readAsText(file);
  reader.onload = function(){
      const dataArr = splitStringToArray(reader.result);
      const dataMatrix = formatArrayToMatrix(dataArr); 

      dataMatrix.forEach((row,index) => {
        if(row.length !== 4){
          this.errors.push(index+1);
        }
      });

      if(errors.length){
        errors.forEach((error) =>
        console.error(`Data on row ${error} is invali`)
        );
      }
      console.log(dataMatrix)

      const dataArray = dataMatrix.map((row) => {
        return {
          employeeId: parseInt(row[0]),
          projectId: parseInt(row[1]),
          startDate: Date.parse(row[2]),
          endDate: Date.parse(row[3])
        }
      });

      setData(dataArray);
    };
  }

  

  return (
     <div className='App'>
      <input type='file' onChange={handleFileUpload} />
      {!!DataTable.length && (
      <>
        <DataTable data={data} />
        
        <FinalTable data={data} />
        
      </>
        )} 
     </div> 
  );
  
  
}

export default App;
