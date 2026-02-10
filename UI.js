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

    // Figure out which task was clicked and get it's data to get taskID & process the action. 
    let action = ""; 
    let taskID = ""; 
    try 
    {
        // Access the .task div element (this will help you to find the tasks unique ID to move up/down/delete).
        const taskElement = e.target.closest("[data-id]");     
        taskID = Number(taskElement.dataset.id);  // Get the tasks ID.     
        let actionBtn = e.target.closest("[data-action]"); // Find out which element/action was clicked by accessing the DOM data attribute.  
        action = actionBtn.dataset.action; 
    } 
    catch (error) 
    {
        return;   
    }

    switch (action) {
        case "upBtn":
            // Move the task up in the taskList.
            taskList.MoveTaskUp(taskID); 
            break;
        
        case "downBtn":
            // Move the task down in the taskList.
            taskList.MoveTaskDown(taskID); 
            break;

        case "delTask":
            // Remove the task from the taskList.
            taskList.DeleteTask(taskID);
            break;

        case "toggleCheck":
            // Toggle the checkbox's state. 
            let task = taskList.tasks[taskID];
            task.ToggleCheckbox(task); 
            break;
            
        default:
            return;
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
            <input type="checkbox" class="taskCheckbox" data-action="toggleCheck" ${task.isChecked ? "checked" : ""}>
            <span class="taskContent${task.isChecked ? " completed" : ""}">${task.content}</span>
        </div>
        <div class="taskRightSide">
            <button class="actionBtn" data-action="upBtn" title="Move Task Up">&#8593</button>
            <button class="actionBtn" data-action="downBtn" title="Move Task Down">&#8595</button>
            <button class="actionBtn" data-action="delTask" title="Delete Task">&#10006</button>
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