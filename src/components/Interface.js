import { useState } from "react";
import "../assets/css/Interface.css";
import { splitStringToArray, formatArrayToMatrix } from "../utils/dataUtils";
import DataTable from "./DataTable";
import FinalTable from "./FindWorkerPairs";
import FilterByProjects from "./FilterByProjects";

function Interface() {
  const [data, setData] = useState([]);
  const [buttonCheckClicked, setCheckButtonClicked] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showFilterComponent, setShowFilterComponent] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

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
    setShowInput(false);
    setShowFilterComponent(false);
    setSubmitClicked(false);

    setCheckButtonClicked(true);
  };
  const handleSearchButtonClick = () => {
    setCheckButtonClicked(false);
    setShowInput(true);
    setSubmitClicked(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (submitClicked) {
      setShowFilterComponent(true);
    }
  };

  const handleInputSubmit = () => {
    setShowFilterComponent(true);
    setSubmitClicked(true);
  };

  const refreshPage = () => {
    window.location.reload();
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
              <button className="search-btn" onClick={handleSearchButtonClick}>
                Search by project
              </button>

              <button className="check-btn" onClick={handleCheckButtonClick}>
                Check for pair
              </button>

              <button className="refresh-btn" onClick={refreshPage}>
                Refresh
              </button>
            </div>

            {showInput && (
              <div className="search">
                <input
                  className="search-input"
                  placeholder="Enter project ID"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <button className="search-btn" onClick={handleInputSubmit}>
                  <i class="fa fa-search" aria-hidden="true"></i>
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

export default Interface;
