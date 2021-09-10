var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");


 var taskFormHandler = function(event) {
     event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //Package Up Data as Object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput 
    };

    //Check if Input Values Are Empty
     if(!taskNameInput || !taskTypeInput) {
         alert("You need to fill out the task form!");
         return false;
     }

     formE1.reset();
    //Send it as an Argument to CreateTaskE1
    createTaskE1(taskDataObj);
};

 var createTaskE1 = function(taskDataObj) {
    //Creates a List
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
   
    //Creates Divider to Hold Task Info
   var taskInfoE1 = document.createElement("div");
   //Give it a Class Name
   taskInfoE1.className = "task-info";
   //ADD HTML CONTENT
   taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
   listItemE1.appendChild(taskInfoE1);

    //ADD entire list item TO LIST
    tasksToDoE1.appendChild(listItemE1);
 }


 formE1.addEventListener("submit", taskFormHandler); 
 