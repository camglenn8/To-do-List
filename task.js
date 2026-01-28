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

        console.log(Task.totalTasks); 
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
}