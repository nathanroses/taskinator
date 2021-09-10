var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");


 var createTaskHandler = function(event) {
     event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //Creates a List
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
  //Creates Divider to Hold Task Info
   var taskInfoE1 = document.createElement("div");
   //Give it a Class Name
   taskInfoE1.className = "task-info";
   //ADD HTML CONTENT
   taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    
    listItemE1.appendChild(taskInfoE1);

    //ADD entire list item TO LIST
    tasksToDoE1.appendChild(listItemE1);
};

 formE1.addEventListener("submit", createTaskHandler); 
 