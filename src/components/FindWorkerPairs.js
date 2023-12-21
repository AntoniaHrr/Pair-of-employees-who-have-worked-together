function FinalTable({ data }) {
    const projectEmployees = Object.groupBy(data, ({projectId}) => projectId);
    const commonTimeForProjects = findCommonTimeForProjects(projectEmployees);
    

    for (const key in commonTimeForProjects) {
        if (commonTimeForProjects.hasOwnProperty(key)) {
          const arrayOfObjects = commonTimeForProjects[key];
          
          // Check if the value is an array of objects
          if (Array.isArray(arrayOfObjects) && arrayOfObjects.every(obj => typeof obj === 'object')) {
            console.log(`Array of objects for ${key}:`);
      
            // Iterate through the array of objects
            arrayOfObjects.forEach((object, index) => {
              console.log(`  ${index + 1}: employee1 - ${object.employee1}, employee2 - ${object.employee2}, projectTime - ${object.commonTime}`);
            });
          }
        }
      }




    //console.log(commonTimeForProjects)
}

function findCommonTimeRange(range1, range2) {
    const start = Math.max(range1.startDate, range2.startDate);
    const end = Math.min(range1.endDate || Date.now(), range2.endDate || Date.now());

    return start <= end ? { startDate: start, endDate: end } : null;
}

function findCommonTimeForProject(project) {
    const commonTimePairs = [];

    for (let i = 0; i < project.length - 1; i++) {
        for (let j = i + 1; j < project.length; j++) {
            const commonTimeRange = findCommonTimeRange(project[i], project[j]);

            if (commonTimeRange !== null) {
                commonTimePairs.push({
                    employee1: project[i].employeeId,
                    employee2: project[j].employeeId,
                    commonTime: commonTimeRange
                });
            }
        }
    }

    return commonTimePairs;
}

function findCommonTimeForProjects(projects) {
    const result = {};

    for (const projectId in projects) {
        const project = projects[projectId];
        const commonTimePairs = findCommonTimeForProject(project);
        result[projectId] = commonTimePairs;
    }

    return result;
}

// function mostTimes(projects){
//     const resultMatrix = {};

//     for(const projectId in projects){
//         const 
//     }
// }

export default FinalTable;
