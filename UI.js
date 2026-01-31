// Imports
import Task from "./task.js"; 

// Constant variables.
const InvalidTask = "";

// HTML Selectors. 
let userInput = document.getElementById("userInput"); 
let submitTaskBtn = document.getElementById("submitTaskBtn"); 
let taskList = document.getElementById("taskList"); 

// Array for storing all tasks. 
let taskArray = [];  


// sbumitTaskBtn Click Event Listener. 
submitTaskBtn.addEventListener("click", () =>
{
    // Get the userInput & clear the field. 
    let taskEntered = userInput.value.trim();

    // Check to see if user entered an empty task. 
    if (taskEntered === InvalidTask)
    {
        // Error: prompt user to enter a valid task. 
        console.log("ERROR: Enter a value"); 
        return; 
    }

    // Instantiate a new Task object. 
    let task = new Task(taskEntered); 

    // Check to see if there's a duplicate task in the task list.
    let result = task.DuplicateTask(taskEntered, taskArray);  
    if (result === true)
    {
        console.log(`ERROR: ${taskEntered} already exists.`); 
          // Reset the userInput field.
        userInput.value = ""; 
        userInput.focus(); 
        return; 
    }

    // Add the task to the task[].  
    taskArray.push(task);  

    // Update the task list. 
    updateTaskList(); 

    // Reset the userInput field.
    userInput.value = ""; 
    userInput.focus(); 
});



// taskList Click Event Listener (Event Delegation). 
taskList.addEventListener("click", (e) => {
    // Access the .task div element (this will help you to find the tasks unique ID to move up/down/delete).
    const taskElement = e.target.closest(".task");   
    const taskID = Number(taskElement.dataset.id);  // Get the tasks ID.
    let task = taskArray[taskID];                   // Access the task object from the taskArrayp[].                           

    // Find out which element/action was clicked.  
    const action = e.target.className; 

    switch (action) {
        case "upBtn":
            // Move the task up in the taskArray[].
            task.MoveTaskUp(taskID, taskArray);
            break;
        
        case "downBtn":
            // Move the task down in the taskArray[].
            task.MoveTaskDown(taskID, taskArray); 
            break;

        case "delTask":
            // Remove the task from the taskArray[]
            task.DeleteTask(taskID, taskArray);
            break;

        case "taskCheckbox":
            // Toggle the checkbox's state. 
            task.ToggleCheckbox(task); 
            
            break;
            
        default:
            break;
    }

    updateTaskList(); 
}); 





// Name             : userInput Event Listener
// Description      : This event listener gets triggered anytime a user hits "Enter" on the keyboard while on the userInput field. 
// Parameters       : Void.
// Return Values    : Void. 
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
    {
        // trigger a click event. 
        submitTaskBtn.click(); 
    }
});





// Name             : updateTaskList
// Description      : The purpose of this function is to clear and update the current taskList with all tasks within taskArray[]. 
// Parameters       : Void. 
// Return Values    : Void. 
function updateTaskList()
{
     // Get the taskList section & clear all tasks.
    let taskList = document.getElementById("taskList"); 
    taskList.classList.add("taskList"); 
    taskList.innerHTML = ""; 

    // Iterate through each task and update the taskList. 
    for (let task of taskArray)
    {
        // Create an HTML element for the task, add the class, and a unique ID to the tasks dataset.  
        let taskData = document.createElement("div");
        taskData.classList.add("task"); 
        taskData.dataset.id = task.index;   // This provides the DOM with the unique ID. 

        // Add all elements/inner HTML that go within this div (checkbox, up/down buttons, & delete button). 
        taskData.innerHTML = 
        `<div class="taskLeftSide">
            <input type="checkbox" class="taskCheckbox" ${task.isChecked ? "checked" : ""}>
            <span class="taskContent${task.isChecked ? " completed" : ""}">${task.content}</span>
        </div>
        <div class="taskRightSide">
            <button class="upBtn">Up</button>
            <button class="downBtn">Down</button>
            <button class="delTask">X</button>
        </div>`;

        // Append the task to the task div.
        taskList.appendChild(taskData); 
    }   
}