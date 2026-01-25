// HTML Selectors. 
let userInput = document.getElementById("userInput"); 
let submitTaskBtn = document.getElementById("submitTaskBtn"); 

// Array for storing all tasks. 
let taskArray = []; 

submitTaskBtn.addEventListener("click", () =>
{
    // Get the userInput. 
    let task = userInput.value; // *** TODO: Check to see if the input data is valid. 
    
    // Add this to the task[]. 
    taskArray.push(task); 

    // Update the task list. 
    updateTaskList(); 
}); 




// Name             :
// Description      :
// Parameters       :
// Return Values    :
function updateTaskList()
{
     // Get the taskList section & clear all tasks.
    let taskList = document.getElementById("taskList"); 
    taskList.innerHTML = ""; 

    
    for (let taskData of taskArray)
    {
        // Create an HTML element for the task & add the class.  
        let task = document.createElement("div");
        task.classList.add("task"); 

        // Add all elements/inner HTML that go within this div (checkbox, up/down buttons, & delete button). 
        task.innerHTML = 
        `<input type="checkbox" id="taskCheckbox">
        <span id="taskData">${taskData}</span>
        <button id="upBtn">Up</button>
        <button id="downBtn">Down</button>
        <button id="delTask">X</button>`;

        // Append the task to the task div.
        taskList.appendChild(task); 
    }   
}