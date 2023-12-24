import React from "react";
import '../assets/css/Style.css';
import Sorted from '../utils/Sorted.js'

function FinalTable(data){

const sorted = Sorted(data);

let max=0;

for (const key in sorted) {
    if (sorted.hasOwnProperty(key)) {

      if(max < sorted[key].time){
        max = sorted[key].time;
      }    
    }
  }

  for(const key in sorted){
    if (sorted.hasOwnProperty(key)) {
        if(max === sorted[key].time){
            const [id1, id2] = key.split("_");

            return (
                <div className="answer-div">
                  <h2 >Pair with most days spent working together:</h2>
                 <h3>Employee {id1} and employee {id2} worked as team the most!</h3>
                  <ul className="answer">
                    {sorted[key].proj.map((obj, index) => (
                       <li key={index}>
                      Project ID: {obj.projectId} - Days spent on project: {obj.timeForProject}
                     </li>
                    ))}
                  </ul>
                  <h2>Total days spent:</h2>
                  <p>{sorted[key].time} days</p>
                </div>
              );
        }    
      }
  }

}


export default FinalTable;
