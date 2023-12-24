function Sorted({ data }) {
    const projectEmployees = Object.groupBy(data, ({projectId}) => projectId);
    const commonTimeForProjects = findCommonTimeForProjects(projectEmployees);

    const sorted = {};

    for (const key in commonTimeForProjects) {
        if (commonTimeForProjects.hasOwnProperty(key)) {
          const arrayOfObjects = commonTimeForProjects[key];
          
          // Check if the value is an array of objects
          if (Array.isArray(arrayOfObjects) && arrayOfObjects.every(obj => typeof obj === 'object')) {
            arrayOfObjects.forEach((object, index) => {
                const pair = `${object.employee1}_${object.employee2}`;
                if (sorted.hasOwnProperty(pair)) {
                    const newPair={projectId : key, timeForProject : object.commonTime};
                    let time = object.commonTime + sorted[pair].time; 
                   
                    sorted[pair].proj.push(newPair);
                    sorted[pair].time = time;
                    
                  } else {
                    let time=object.commonTime;
                    const newPair=[{projectId : key, timeForProject : object.commonTime}];
                    const newPairTime = {proj : newPair,time : time};
                    sorted[pair] = newPairTime;
                  }
              });
          }
        }
      }


      return sorted;
    
}

function findCommonTimeRange(range1, range2) {
    const start = Math.max(range1.startDate, range2.startDate);
    const end = Math.min(range1.endDate || Date.now(), range2.endDate || Date.now());

    const seconds = end-start;
    const common = Math.round(seconds / (1000 * 60 * 60 * 24));

    return start<=end ? common : null;

}

function findCommonTimeForProject(project) {
    const commonTimePairs = [];

    for (let i = 0; i < project.length - 1; i++) {
        for (let j = i + 1; j < project.length; j++) {
            const commonTimeRange = findCommonTimeRange(project[i], project[j]);

            if (commonTimeRange !== null) {
                let a = project[i].employeeId;
                let b = project[j].employeeId;
                if(a>b){
                    [a,b] = [b,a];
                }
            
                commonTimePairs.push({
                    employee1: a,
                    employee2: b,
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

export default Sorted;