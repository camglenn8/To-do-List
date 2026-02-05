import { ERROR } from "./constants.js"; 

export default class TaskList
{
    // Data Members
    #tasks = [];
    
    // Constructor
    constructor()
    {
        this.TaskList; 
    }

    // Getters/Accessors
   get tasks(){return this.#tasks};  

    // Methods -------------------------------------------------------------------------------------------------------------------------------

    // Name             : AddTask
    // Description      : The purpose of this method is to verify the entered task and add it to the task list.
    // Parameters       : Task{}    :   This is the task being entered by user. 
    // Return Values    : {}        :   This object consists of a bool status and a message. 
    AddTask(currentTask)
    {
        // Check to see if the task already exists within the taskList. 
        const result = this.#DuplicateTask(currentTask);
        if (result === true)
        {
            // Task already exists on the task list.
            return {success:false, error:ERROR.DUPLICATE_TASK}; 
        }

        // Add the task to the task list + the ID.
        currentTask.id = this.#tasks.length;   
        this.#tasks.push(currentTask);

        return {success:true};  
    }





       // Name             : MoveTaskDown
    // Description      : The purpose of this method is to move a specific task down the taskList.  
    // Parameters       : number taskID         :   This is the taskArray index. 
    //                  : [string] taskArray    :   This is the array of tasks.
    // Return Values    : Void. 
    MoveTaskDown(taskID)
    {
        // Check to see if the current task is the last in the task list. 
        let lastTask = this.#tasks.length - 1;
        if (taskID !== lastTask)
        {
            // Create a temp variable to hold the lower task. 
            let temp = this.#tasks[taskID + 1]; 
            // Copy the current task into the lower tasks spot.
            this.#tasks[taskID + 1] = this.#tasks[taskID];   
            // Copy the temp variable into the current tasks spot.
            this.#tasks[taskID] = temp; 
            
            // Re-index the task list.
            this.#ShuffleTaskList(); 
        }
        
         return;  
    }





    // Name             : MoveTaskUp
    // Description      : The purpose of this method is to move a specific task up in the taskList.  
    // Parameters       : number taskID         :   This is the current tasks ID.  
    // Return Values    : Void. 
    MoveTaskUp(taskID)
    {
        let firstTask = 0; 

        // Check to see if the current task is the first in the task list. 
        if (taskID !== firstTask)
        {
            // Create a temp variable to hold the lower task. 
            let temp = this.#tasks[taskID - 1]; 
            // Copy the current task into the lower tasks spot.
            this.#tasks[taskID - 1] = this.#tasks[taskID];   
            // Copy the temp variable into the current tasks spot.
            this.#tasks[taskID] = temp;  
            
            // Re-index the task list.
            this.#ShuffleTaskList(); 
        }

        return;  
    }





    // Name             : DuplicateTask
    // Description      : The purpose of this method is to verify if there's duplicates  within the task List.
    // Parameters       : Task{}    :   This is the task object being entered. 
    // Return Values    : bool true :   The task already exists within the task list. Otherwise, false. 
    #DuplicateTask(currentTask)
    {
        for (let task of this.#tasks)
        {
            // Compare the current task to the task within the taskList. 
            if (currentTask.content.toUpperCase() === task.content.toUpperCase())
            {
                return true; 
            }
        }
        
        return false;  
    }





    // Name             : ShuffleTaskList
    // Description      : The purpose of this method is to re-index all elements within the task list. 
    // Parameters       : [string] taskList    :   This is the array of tasks.
    // Return Values    : Void. 
    #ShuffleTaskList()
    {
         // Get the # of tasks within the task list.  
        let totalTasks = this.#tasks.length;   

        // Re-index all elements in the array.
        for (let i = 0; i < totalTasks; i++)
        {
            this.#tasks[i].id = i; 
        }

        return; 
    }
}