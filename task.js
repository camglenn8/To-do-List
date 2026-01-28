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


    // Name             : deleteTask
    // Description      : The purpose of this function is to find the task to be removed from the taskArray[] and update the taskList. 
    // Parameters       : String taskData   :   This is the task to be removed. 
    // Return Values    : Void. 
    DeleteTask(taskID, listOfTasks)
    {
        // Remove from the taskArray[] list. 
        listOfTasks.splice(taskID, 1);  

        // Get the # of elements within the listOfTasks[]. 
        let totalTasks = listOfTasks.length; 

        // Re-index all elements in the array.
        for (let i = 0; i < totalTasks; i++)
        {
            listOfTasks[i].index = i; 
        }

        // Decrement the classes totalTasks by 1. 
        Task.totalTasks--;   
        
        console.log(listOfTasks);
        console.log(Task.totalTasks);

        return; 
    }
}