// Constant variables.
const invalidTask = ""; 

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
    let task = userInput.value.trim(); 

    // Check to see if user entered an empty task. 
    if (task === invalidTask)
    {
        // Error: prompt user to enter a valid task. 
        console.log("ERROR: Enter a value"); 
        return; 
    }



    // **** TODO: Check to see if there are duplicates in the taskArray[]!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
        // If so, prompt the user. 



    // Add this to the task[]. 
    taskArray.push(task); 

    // Update the task list. 
    updateTaskList(); 

    // Reset the userInput field.
    userInput.value = ""; 
    userInput.focus(); 
});



// taskList Click Event Listener (Event Delegation). 
taskList.addEventListener("click", (e) => {
    // Access the .task div element (this will help you to find the taskData to move up/down/delete).
    const task = e.target.closest(".task");                         // Find the closest parent element. 
    const taskData = task.querySelector(".taskData").textContent;   // Get's the taskData child element.  

    // Find out which element/action was clicked.  
    const action = e.target.className; 

    switch (action) {
        case "upBtn":
            // Move the task up in the taskArray[].
            break;
        
        case "downBtn":
            // Move the task down in the taskArray[].
            moveTaskDown(taskData); 
            break;

        case "delTask":
            // Remove the task from the taskArray[]
            deleteTask(taskData);
            break;

        case "taskCheckbox":
            // Strike through the task data. 
            break;
    
        default:
            break;
    }
}); 




// Name             : moveTaskDown
// Description      : The purpose of this function is to move a specific task down the taskList.  
// Parameters       : String taskData   :   This is the task to be moved down the list. 
// Return Values    : Void. 
function moveTaskDown(taskData)
{
    // Find the current elements index in the taskArray[].
    let currentIndex = taskArray.indexOf(taskData);  

    // See if this is the last element in the array. 
    if (Number(currentIndex) !== (taskArray.length - 1))   
    {
        // Move task down. 
        let temp = taskArray[currentIndex + 1]; // Move the lower task to a temp variable. 
        taskArray[currentIndex + 1] = taskData; // Replace the lower task with the currentIndex taskData. 
        taskArray[currentIndex] = temp;         // Repalce the currentIndex with the temp value. 

        // Update the taskList. 
        updateTaskList() ;
    }
}





// Name             : deleteTask
// Description      : The purpose of this function is to find the task to be removed from the taskArray[] and update the taskList. 
// Parameters       : String taskData   :   This is the task to be removed. 
// Return Values    : Void. 
function deleteTask(taskData)
{
    let index = taskArray.indexOf(taskData); 
    taskArray.splice(index, 1); 
    updateTaskList();
}




// Name             : updateTaskList
// Description      : The purpose of this function is to clear and update the current taskList with all tasks within taskArray[]. 
// Parameters       : Void.
// Return Values    : Void. 
function updateTaskList()
{
     // Get the taskList section & clear all tasks.
    let taskList = document.getElementById("taskList"); 
    taskList.innerHTML = ""; 

    // Iterate through each task and update the taskList. 
    for (let taskData of taskArray)
    {
        // Create an HTML element for the task & add the class.  
        let task = document.createElement("div");
        task.classList.add("task"); 

        // Add all elements/inner HTML that go within this div (checkbox, up/down buttons, & delete button). 
        task.innerHTML = 
        `<input type="checkbox" class="taskCheckbox">
        <span class="taskData">${taskData}</span>
        <button class="upBtn">Up</button>
        <button class="downBtn">Down</button>
        <button class="delTask">X</button>`;

        // Append the task to the task div.
        taskList.appendChild(task); 
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