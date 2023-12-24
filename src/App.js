import { useState } from "react";
import "./App.css";
import { splitStringToArray, formatArrayToMatrix } from "./utils/dataUtils";
import DataTable from "./components/DataTable";
import FinalTable from "./components/FindWorkerPairs";
import FilterByProjects from "./components/FilterByProjects";

function App() {
  const [data, setData] = useState([]);
  const [buttonCheckClicked, setCheckButtonClicked] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showFilterComponent, setShowFilterComponent] = useState(false);

  function handleFileUpload(e) {
    if (e.target.files.length === 0) return;
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    const errors = [];

    reader.readAsText(file);
    reader.onload = function () {
      const dataArr = splitStringToArray(reader.result);
      const dataMatrix = formatArrayToMatrix(dataArr);

      dataMatrix.forEach((row, index) => {
        if (row.length !== 4) {
          this.errors.push(index + 1);
        }
      });

      if (errors.length) {
        errors.forEach((error) =>
          console.error(`Data on row ${error} is invalid`)
        );
      }

      const dataArray = dataMatrix.map((row) => {
        console.log("Date:");
        console.log(Date.parse(row[2]));
        return {
          employeeId: parseInt(row[0]),
          projectId: parseInt(row[1]),
          startDate: Date.parse(row[2]),
          endDate: Date.parse(row[3]),
        };
      });

      setData(dataArray);
    };
  }

  const handleCheckButtonClick = () => {
    setCheckButtonClicked(true);
  };
  const handleButtonClick = () => {
    setShowInput(true);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleInputChange = (event) => {
    // Update the input value as the user types
    setInputValue(event.target.value);
  };

  const handleInputSubmit = () => {
    // Activate FilterByProject component with input value
    setShowFilterComponent(true);
  };

  return (
    <div className="App">
      <div className="White">
        <h1>Welcome! Please choose file to get its information!</h1>
        <div className="file-input-container">
          <label htmlFor="fileInput" className="file-label">
            Select file
          </label>
          <input
            type="file"
            id="fileInput"
            className="file-input"
            onChange={handleFileUpload}
          />
        </div>
        {selectedFile && (
          <>
            <DataTable data={data} />

            <div className="buttons">
              <button className="check-btn" onClick={handleCheckButtonClick}>
                Check for pair
              </button>
              <button className="filter-btn" onClick={handleButtonClick}>
                Filter by project
              </button>
              <button className="refresh-btn" onClick={refreshPage}>
                Refresh
              </button>
            </div>

            {showInput && (
              <div className="filter">
                <input
                  className="filter-input"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <button className="filter-btn" onClick={handleInputSubmit}>
                  Filter
                </button>
              </div>
            )}

            {showFilterComponent && (
              <FilterByProjects data={data} project={inputValue} />
            )}

            {buttonCheckClicked && <FinalTable data={data} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
