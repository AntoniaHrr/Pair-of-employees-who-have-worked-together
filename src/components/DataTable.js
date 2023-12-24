import '../assets/css/DataTable.css';

function DataTable({data}){
    return (
        <div className='FirstTable'>
            <h1>Default Statistics</h1>
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
                {data.map( (row, index) =>{
                    return (
                        <tr key={index}>
                            <td>{row.employeeId}</td>
                            <td>{row.projectId}</td>
                            <td>{new Date(row.startDate).toLocaleDateString("bg-BG")}</td>
                            <td>{row.endDate ? new Date(row.endDate).toLocaleDateString("bg-BG") : "Ongoing"}</td>
                        </tr>
                    )
                } )}
            </tbody>
        </table>
        </div>
        
    );
}

export default DataTable;