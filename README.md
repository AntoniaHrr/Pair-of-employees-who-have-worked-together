# Pair of employees who have worked together

Final project for Sirma Accademy
<br/>
Created by Antonia Hristova

## Concept

Create an application that identifies the pair of employees who
have worked together on common projects for the longest period
of time and the time for each of those projects.
There is a possibility that an employee ended working on a project but started working again on it at later phase.
Here are listed the given buttons and their functionality:

### `Select file`

Opens the computer files and lets a user to select a CSV file from their PC.

### `Check pair`

Pressing this button outputs the pair which worked together the most, their total days working together and table which contains all the common projects and separate time for them.

### `Search by Project ID`

This button lets user to find all entries for project by its ID. When its pressed, it pops up an input field where project ID is entered. After that it ouputs new table containing only the entries where employees worked on the desired project.

### `refresh`

Refreshes the whole page

## Algorithm

To fulfill the task we start by reading all the information and organizing it in object of arrays where the keys are the task ID and each key contains array with the two employeesand their common working time in nanoseconds. Each key contains array of the following objects:

```
{
    employee1: a,
    employee2: b,
    commonTime: commonTimeRange
}
```

This new object gives us to opportunity to see all the unique pairs regarding a project. After that a new object will be created - each key of the new object is a specific pair of employees turned into string and dividing them by underscore like **employee1_employee2** .

```
{
    e1_e2 : { proj: Array[{..}], proj: commonTime}
    ...
}

```

We go through the prev object and check for each project if the pair is new and if it is we just add new key to the object containing Array with the project ID, common time spent on it and separate value for the total time spent on project. If the pair exists in the object we only add their next common project and incease the time. Finally we can find the max total time in the object and get its key and the projects connected to the key.

## Additional features

Added search and refresh functionallity explained above

## Date formats supported

Current version of the project manages the YYYY-MM-DD and MM-DD-YYYY data formats
In the data folder is given example CSV file **testCsv.csv** supporting the YYYY-MM-DD format and **testCsvTwo.csv** supporting the MM-DD-YYYY format
