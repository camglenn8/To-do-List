export default class Task
{
    // Data Members 
    #content = "";
    #id = 0;  
    #isChecked = "";  
    

    // Constructors
    constructor(content = "")
    {
        this.#content = content;   
        this.#isChecked = false;
    }

    // Getters/Accesors
    get content(){return this.#content;}
    get id (){return this.#id}; 
    get isChecked(){return this.#isChecked}; 

    // Setters/Mutators
    set content(content){this.#content = content;}
    set id(id){this.#id = id}; 
    set isChecked(status){this.#isChecked = status}; 


    // Methods

    // Name             : ToggleCheckbox
    // Description      : The purpose of this method is to toggle the state of the current tasks checkbox.
    // Parameters       : {Task}    :   This is an instance of a Task object. 
    // Return Values    : Void. 
    ToggleCheckbox(task)
    {
        // Toggle the checkbox. 
        if (task.isChecked === false)
        {
            task.isChecked = true;
        }
        else
        {
            task.isChecked = false;
        }

        return;
    }




    // Name             : DeleteTask
    // Description      : The purpose of this method is to remove the task from the list of tasks. s
    // Parameters       : String taskID     :   This is the task to be removed. 
    //                  : [string] taskList :   This is the list of tasks.
    // Return Values    : Void. 
    // DeleteTask(taskID, taskList)
    // {
    //     // Remove from the taskArray[] list. 
    //     taskList.splice(taskID, 1);  

    //     // Shuffle the task list.
        
    //     // Decrement the classes totalTasks by 1. 
    //     Task.totalTasks--;   

    //     return; 
    // }
}