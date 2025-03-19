// Global variables
var taskIdCounter = 0;
var tasks = [];
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");
var toDoCountEl = document.querySelector("#to-do-count");
var inProgressCountEl = document.querySelector("#in-progress-count");
var completedCountEl = document.querySelector("#completed-count");

// Form submission handler
var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Validate inputs
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    // Reset form fields
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    // Check if this is an edit or new task
    var isEdit = formEl.hasAttribute("data-task-id");
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        createTaskEl(taskDataObj);
    }
};

// Create new task element
var createTaskEl = function(taskDataObj) {
    // Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // Create div to hold task info
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // Create task actions
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // Add to the appropriate list based on status
    if (taskDataObj.status === "to do") {
        tasksToDoEl.appendChild(listItemEl);
    } else if (taskDataObj.status === "in progress") {
        tasksInProgressEl.appendChild(listItemEl);
    } else if (taskDataObj.status === "completed") {
        tasksCompletedEl.appendChild(listItemEl);
    }

    // Save task ID to object and add to tasks array
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    // Save tasks to localStorage
    saveTasks();

    // Update task counts
    updateTaskCounts();

    // Increase counter for next task
    taskIdCounter++;
};

// Create the action buttons for a task
var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // Create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    editButtonEl.innerHTML = '<i class="fas fa-edit"></i> Edit';
    actionContainerEl.appendChild(editButtonEl);

    // Create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    deleteButtonEl.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
    actionContainerEl.appendChild(deleteButtonEl);

    // Create dropdown for status
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    // Create status options
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i].toLowerCase());
        statusSelectEl.appendChild(statusOptionEl);
    }
    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

// Complete the edit task process
var completeEditTask = function(taskName, taskType, taskId) {
    // Find the task element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // Update content
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // Update task in array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    // Save to localStorage
    saveTasks();

    // Reset form
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
    document.querySelector("#save-task").innerHTML = '<i class="fas fa-plus"></i> Add Task';
};

// Handle button clicks
var taskButtonHandler = function(event) {
    var targetEl = event.target;
    
    // Find the button if clicked on icon
    if (targetEl.tagName === "I") {
        targetEl = targetEl.parentElement;
    }

    // Edit button clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // Delete button clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// Handle status change
var taskStatusChangeHandler = function(event) {
    // Only handle if the select was changed
    if (event.target.matches(".select-status")) {
        var taskId = event.target.getAttribute("data-task-id");
        var statusValue = event.target.value.toLowerCase();
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

        // Move task to appropriate column
        if (statusValue === "to do") {
            tasksToDoEl.appendChild(taskSelected);
        } else if (statusValue === "in progress") {
            tasksInProgressEl.appendChild(taskSelected);
        } else if (statusValue === "completed") {
            tasksCompletedEl.appendChild(taskSelected);
        }

        // Update task in array
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === parseInt(taskId)) {
                tasks[i].status = statusValue;
            }
        }

        // Save to localStorage
        saveTasks();
        
        // Update counts
        updateTaskCounts();
    }
};

// Load form with task to edit
var editTask = function(taskId) {
    // Get task element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // Get content values
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    // Set form values
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // Update button text
    document.querySelector("#save-task").textContent = "Save Task";
    document.querySelector("#save-task").innerHTML = '<i class="fas fa-save"></i> Save Task';

    // Set data attribute on form
    formEl.setAttribute("data-task-id", taskId);
};

// Delete a task
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    // Confirm before deleting
    if (confirm("Are you sure you want to delete this task?")) {
        taskSelected.remove();

        // Create new array for updated tasks
        var updatedTaskArr = [];

        // Filter out the deleted task
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id !== parseInt(taskId)) {
                updatedTaskArr.push(tasks[i]);
            }
        }

        // Replace tasks array with filtered array
        tasks = updatedTaskArr;
        
        // Save to localStorage
        saveTasks();
        
        // Update counts
        updateTaskCounts();
    }
};

// Save tasks to localStorage
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Load tasks from localStorage
var loadTasks = function() {
    // Get tasks from localStorage
    var savedTasks = localStorage.getItem("tasks");
    
    // Return if no saved tasks
    if (!savedTasks) {
        return false;
    }
    
    // Parse JSON string to array
    savedTasks = JSON.parse(savedTasks);
    
    // Find highest ID for counter
    var highestId = 0;
    for (var i = 0; i < savedTasks.length; i++) {
        if (savedTasks[i].id > highestId) {
            highestId = savedTasks[i].id;
        }
    }
    taskIdCounter = highestId + 1;
    
    // Create task elements
    for (var i = 0; i < savedTasks.length; i++) {
        createTaskEl(savedTasks[i]);
    }
};

// Update task counts in each column
var updateTaskCounts = function() {
    var todoCount = tasksToDoEl.querySelectorAll(".task-item").length;
    var inProgressCount = tasksInProgressEl.querySelectorAll(".task-item").length;
    var completedCount = tasksCompletedEl.querySelectorAll(".task-item").length;
    
    toDoCountEl.textContent = todoCount;
    inProgressCountEl.textContent = inProgressCount;
    completedCountEl.textContent = completedCount;
};

// Event listeners
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// Initialize app
loadTasks();
updateTaskCounts();

