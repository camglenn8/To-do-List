// Imports
import Task from "./task.js"; 
import TaskList from "./TaskList.js"; 
import {ERROR, EmptyTask} from "./constants.js"; 

// HTML Selectors. 
let userInput = document.getElementById("userInput"); 
let submitTaskBtn = document.getElementById("submitTaskBtn"); 
let taskListElement = document.getElementById("taskList"); 

// Instantiate a new TaskList obejct for storing all tasks. 
let taskList = new TaskList();

// sbumitTaskBtn Click Event Listener. 
submitTaskBtn.addEventListener("click", () =>
{
    // Get the userInput & check to see if the user entered an empty task.
    let taskEntered = userInput.value.trim();
    if (taskEntered === EmptyTask)
    {
        // Error: prompt user to enter a valid task. 
        console.log(`${ERROR.EMPTY_TASK.code} ${ERROR.EMPTY_TASK.message}`); 
        return; 
    }

    // Instantiate a new Task object. 
    let task = new Task(taskEntered); 

    // Add the task to the taskList.  
    const result = taskList.AddTask(task);
    if (result.success === false)
    {   
        // Prompt the user.
        console.log(`${result.error.code} ${result.error.message}`);  
    }

    // Update the task list. 
    updateTaskList(); 

    // Reset the userInput field.
    userInput.value = ""; 
    userInput.focus(); 
});



// taskList Click Event Listener (Event Delegation). 
taskListElement.addEventListener("click", (e) => {
    // Access the .task div element (this will help you to find the tasks unique ID to move up/down/delete).
    const taskElement = e.target.closest(".task");   
    const taskID = Number(taskElement.dataset.id);  // Get the tasks ID.                           

    // Find out which element/action was clicked.  
    const action = e.target.className; 

    switch (action) {
        case "upBtn":
            // Move the task up in the taskArray[].
            console.log(taskList); 
            taskList.MoveTaskUp(taskID); 
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





// Name             : updateTaskList
// Description      : The purpose of this function is to clear and update the current taskList with all tasks within taskArray[]. 
// Parameters       : Void. 
// Return Values    : Void. 
function updateTaskList()
{
     // Get the taskList section & clear all tasks.
    let taskListElement = document.getElementById("taskList"); 
    taskListElement.classList.add("taskList"); 
    taskListElement.innerHTML = ""; 

    // Iterate through each task within the task list and update the taskListElement. 
    for (let task of taskList.tasks)
    {
        // Create an HTML element for the task, add the class, and a unique ID to the tasks dataset.  
        let taskData = document.createElement("div");
        taskData.classList.add("task"); 
        taskData.dataset.id = task.id;   // This provides the DOM with the unique ID. 

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
        taskListElement.appendChild(taskData); 
    }   
}





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