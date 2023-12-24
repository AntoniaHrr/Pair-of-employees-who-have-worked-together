import "../assets/css/DataTable.css";
import React from "react";

let flag = false;

function FilterByProjects({ data, project }) {
  const array = [];

  const projectEmployees = Object.groupBy(data, ({ projectId }) => projectId);
  console.log({ projectEmployees });
  for (const key in projectEmployees) {
    if (key === project) {
      flag = true;
      const arrayOfObjects = projectEmployees[key];
      if (
        Array.isArray(arrayOfObjects) &&
        arrayOfObjects.every((obj) => typeof obj === "object")
      ) {
        arrayOfObjects.forEach((object, index) => {
          array.push(object);
        });
      }
    }
  }

  if (flag === false) {
    return <h3>No project with this Id found!</h3>;
  } else {
    return (
      <div className="FirstTable">
        <table>
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Project Id</th>
              <th>Start Date</th>
              <th>Last Day</th>
            </tr>
          </thead>
          <tbody>
            {array.map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row.employeeId}</td>
                  <td>{row.projectId}</td>
                  <td>{new Date(row.startDate).toLocaleDateString("bg-BG")}</td>
                  <td>
                    {row.endDate
                      ? new Date(row.endDate).toLocaleDateString("bg-BG")
                      : "Ongoing"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FilterByProjects;
