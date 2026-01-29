export default class Task
{
    // Data Members
    static totalTasks = 0; 
    #content = "";
    #index = 0;  
    #isChecked = false;  
    

    // Constructors
    constructor(content = "")
    {
        this.#content = content; 
        this.#index = Task.totalTasks++;    
        this.#isChecked = false; 
    }

    // Getters/Accesors
    get content(){return this.#content;}
    get index (){return this.#index}; 
    get isChecked(){return this.#isChecked}; 

    // Setters/Mutators
    set content(content){this.#content = content;}
    set index(index){this.#index = index}; 
    set isChecked(status){this.#isChecked = status}; 


    // Methods


    // Name             : DeleteTask
    // Description      : The purpose of this method is to remove the task from the list of tasks. s
    // Parameters       : String taskID     :   This is the task to be removed. 
    //                  : [string] taskList :   This is the list of tasks.
    // Return Values    : Void. 
    DeleteTask(taskID, taskList)
    {
        // Remove from the taskArray[] list. 
        taskList.splice(taskID, 1);  

        // Shuffle the task list.
        this.#ShuffleTaskList(taskList); 

        // Decrement the classes totalTasks by 1. 
        Task.totalTasks--;   

        return; 
    }





    // Name             : moveTaskDown
    // Description      : The purpose of this method is to move a specific task down the taskList.  
    // Parameters       : number taskID         :   This is the taskArray index. 
    //                  : [string] taskArray    :   This is the array of tasks.
    // Return Values    : Void. 
    MoveTaskDown(taskID, taskArray)
    {
        // Check to see if the current task is the last in the task list. 
        let lastTask = taskArray.length;
        if (taskID !== lastTask)
        {
            // Create a temp variable to hold the lower task. 
            let temp = taskArray[taskID + 1]; 
            // Copy the current task into the lower tasks spot.
            taskArray[taskID + 1] = taskArray[taskID];   
            // Copy the temp variable into the current tasks spot.
            taskArray[taskID] = temp;  
            
            this.#ShuffleTaskList(taskArray); 
        }

        console.log(taskArray);
        return;  
    }




    // Name             : ShuffleTaskList
    // Description      : The purpose of this method is to re-index all elements within the task list. 
    // Parameters       : [string] taskList    :   This is the array of tasks.
    // Return Values    : Void. 
    #ShuffleTaskList(taskList)
    {
         // Get the # of elements within the listOfTasks[]. 
        let totalTasks = taskList.length; 

        // Re-index all elements in the array.
        for (let i = 0; i < totalTasks; i++)
        {
            taskList[i].index = i; 
        }

        return; 
    }
}