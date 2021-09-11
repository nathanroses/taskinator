var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

 var taskFormHandler = function(event) {
     event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //Check if Input Values Are Empty
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formE1.reset();

    //Reset Form Fields For Next Task
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    //Package Up Data as Object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput 
    };


    //Send it as an Argument to CreateTaskE1
    createTaskE1(taskDataObj);
};

 var createTaskE1 = function(taskDataObj) {
    //Creates a List
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    //Add Task Id as a Custom Atribute
    listItemE1.setAttribute("data-task-id", taskIdCounter);
   
    //Creates Divider to Hold Task Info
   var taskInfoE1 = document.createElement("div");
   //Give it a Class Name
   taskInfoE1.className = "task-info";
   //ADD HTML CONTENT
   taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
   listItemE1.appendChild(taskInfoE1);

    //Buttons
    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemE1.appendChild(taskActionsE1);

    //ADD entire list item TO LIST
    tasksToDoE1.appendChild(listItemE1);

    //Increase Task Counter for Next Unique Id
    taskIdCounter++;
 };

 // Task Actions and Button Menu for Task
 var createTaskActions = function(taskId) {
     var actionContainerE1 = document.createElement("div");
     actionContainerE1.className = "task-actions";
     //Create Edit Button
     var editButtonE1 = document.createElement("button");
     editButtonE1.textContent = "Edit";
     editButtonE1.className = "btn edit-btn";
     editButtonE1.setAttribute("data-task-id", taskId);

     actionContainerE1.appendChild(editButtonE1);

     //Create Delete Button
     var deleteButtonE1 = document.createElement("button");
     deleteButtonE1.textContent = "Delete";
     deleteButtonE1.className = "btn delete-btn";
     deleteButtonE1.setAttribute("data-task-id", taskId);

     actionContainerE1.appendChild(deleteButtonE1);
     
     //Variation Drop Down Menu
     var statusSelectE1 = document.createElement("select"); 
     statusSelectE1.className = "select-status";
     statusSelectE1.setAttribute("name", "status-change");
     statusSelectE1.setAttribute("data-task-id", taskId);

     actionContainerE1.appendChild(statusSelectE1);
     
     //Button Mini menu
     var statusChoices = ["To Do", "In Progress", "Completed"];
      
     for (var i = 0; i < statusChoices.length; i++) {
         //Create Option Element
         var statusOptionE1 = document.createElement("option");
         statusOptionE1.textContent = statusChoices[i];
         statusOptionE1.setAttribute("value", statusChoices[i]);

         //Appen to Select
         statusSelectE1.appendChild(statusOptionE1);
     }

     return actionContainerE1;
  };

 formE1.addEventListener("submit", taskFormHandler); 
 