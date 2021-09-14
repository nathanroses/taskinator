var taskIdCounter = 0;
var tasks = [];
var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var tasksInProgressE1 = document.querySelector("#tasks-in-progress");
var tasksCompletedE1 = document.querySelector("#tasks-completed");
var pageContentE1 = document.querySelector("#page-content");


 
var taskFormHandler = function(event) {
     event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //Check if Input Values Are Empty
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }


    //Reset Form Fields For Next Task
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

     //New
     var isEdit = formE1.hasAttribute("data-task-id");


  
   //had data attribute, so task id and call function complete edit properly
   if (isEdit) {
       var taskId = formE1.getAttribute("data-task-id");
       completeEditTask(taskNameInput, taskTypeInput, taskId);
   }
   //no data attribute,
   else {
       var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput, 
        status: "to do"
    };

    createTaskE1(taskDataObj);
   }
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

    //GRAB data from id task
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    //Increase Task Counter for Next Unique Id
    taskIdCounter++;
    //ETC
    saveTasks();
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


     var completeEditTask = function(taskName, taskType, taskId) {
        //find the matching task list
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
        //new values
        taskSelected.querySelector("h3.task-name").textContent = taskName;
        taskSelected.querySelector("span.task-type").textContent = taskType;
               
        //Loop Through The Task Array and Task the Object with New Content
                for (var i = 0; i < tasks.length; i++) {
                  if (tasks[i].id === parseInt(taskId)) {
                    tasks[i].name = taskName;
                    tasks[i].type = taskType;
                  }
                };
        
        //alert
        alert("Task UPDATED!");
 
        formE1.removeAttribute("data-task-id");
        document.querySelector("#save-task").textContent = "Add Task";
            //ETC
             saveTasks();
    };

    
  //Button Function 
     var taskButtonHandler = function(event) {
    //Get Target Element From Event
      var targetE1 = event.target;
     
      //Edit Button Clicked
     if (targetE1.matches(".edit-btn")) {
         console.log("edit", targetE1)
         var taskId = targetE1.getAttribute("data-task-id");
         editTask(taskId);
     } else if (targetE1.matches(".delete-btn")) {
           console.log("delete", targetE1)
           var taskId = targetE1.getAttribute("data-task-id");
           deleteTask(taskId);
         }
     };
  
     
     
   //
   var taskStatusChangeHandler = function(event) {
       console.log(event.target.value);
    //get the task id   
     var taskId = event.target.getAttribute("data-task-id");
    // find the parent task item element base on id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); 
    //get the current selected options value and cover to lwer case 
    var statusValue = event.target.value.toLowerCase(); 


    //if statements
    if (statusValue === "to do") {
        tasksToDoE1.appendChild(taskSelected);
      } else if (statusValue === "in progress") {
        tasksInProgressE1.appendChild(taskSelected);
      } else if (statusValue === "completed") {
        tasksCompletedE1.appendChild(taskSelected);
      }

          //UPDATE TASK in TASK ARRAY
          for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === parseInt(taskId)) {
              tasks[i].status = statusValue;
            }
          }
          //ETC
          saveTasks();
   };
   
    //Edit Function
     var editTask = function(taskId) {
        console.log(taskId);
        
        //Get Task List Item Element
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
        //Get Content From Task Name and Type
        var taskName = taskSelected.querySelector("h3.task-name").textContent;
        var taskType = taskSelected.querySelector("span.task-type").textContent;

        //Query Selector
        document.querySelector("input[name='task-name']").value = taskName;
        document.querySelector("select[name='task-type']").value = taskType;
        
        //Form
        formE1.setAttribute("data-task-id", taskId);
        formE1.querySelector("#save-task").textContent = "Save Task";
    
    };

         
    //Delete Task Function
     var deleteTask = function(taskId) {
        
       console.log(taskId);
        var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId + "']");
        taskSelected.remove();
      
        //create new array to hold updated list of task
        var updatedTaskArr = [];
        //loop the current task
        for (var i = 0; i < tasks.length; i++) {
          //if tasks[i].id doesnt match the value of taskId
          if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
          }
        }
        //reassign task array to be the same as the updated task array
        tasks = updatedTaskArr;
        //ETC
        saveTasks();

    };

    

    //Save Task Function
      var saveTasks = function() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      };


    //Load Task Function
      var loadTasks = function() {
        var savedTasks = localStorage.getItem("tasks");
        //if there are no task set task to an empty array and return the function
        if (!savedTasks) {
          return false;
        }
        console.log("Saved tasks found!");

        //put array of objects
        savedTasks = JSON.parse(savedTasks);

        //loop saved task array
        for (var i = 0; i < savedTasks.length; i++) {
          createTaskE1(savedTasks[i]);
        }
      };




 formE1.addEventListener("submit", taskFormHandler); 
 
 pageContentE1.addEventListener("click", taskButtonHandler);
 
 pageContentE1.addEventListener("change", taskStatusChangeHandler);

 loadTasks();
 