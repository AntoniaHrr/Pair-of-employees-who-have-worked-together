function splitStringToArray(string) {
    return string.split("\r\n");
}

function formatArrayToMatrix(array) {
    return array
            .filter((row)=>row.trim().length !== 0)
            .map((row) => row.split(",").map(trimString));
}

function trimString(string){
    return string.trim();
}

function sanitazeArray(array){
    return array.map((row)=>{
        return row.map(trimString);
    });
}

export {splitStringToArray, formatArrayToMatrix, sanitazeArray};