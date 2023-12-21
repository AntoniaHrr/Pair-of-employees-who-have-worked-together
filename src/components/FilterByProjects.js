

function FilterByProjects({data}){
    const sortedData = data.sort((a,b)=>{
    return b[1]-a[1];});
    return (
        <div>
            <h2>Sorted by Projects ID</h2>
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
                {sortedData.map( (row, index) =>{
                    return (
                        <tr key={index}>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                            <td>{row[3]}</td>
                        </tr>
                    )
                } )}
            </tbody>
        </table>
        </div>
        
    );
}

export default FilterByProjects;