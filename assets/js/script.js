var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var formEl = document.querySelector("#task-form");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

var tasks = [];

var taskFormHandler = function(event) {
event.preventDefault();
var taskNameInput = document.querySelector("input[name='task-name']").value;
var taskTypeInput = document.querySelector("select[name='task-type']").value;
var isEdit = formEl.hasAttribute("data-task-id");

// has data attribute, so get task id and call function to complete edit process
if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } 
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
    };
  
    createTaskEl(taskDataObj);
  }
//check if input is empty
if(!taskNameInput || !taskTypeInput) {
    alert("You need to fill the form out yo!");
    return false;
}

formEl.reset();
};

var completeEditTask = function(taskName, taskType, taskId) {
    //finds the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //sets new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through tasks array and task object with new content
    for(var i = 0; v < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    saveTasks()
    
    alert("Task has been updated!")

    formEl.removeAttribute.apply("data-task-id");
    document.querySelector.apply("#save-task").textContent = "Add Task";    

  };

//createTaskElement Fuctiion//
//1. Creating the element "Li"
//2. Linking the class name for style

//1. Adding a task custom attribute

//1. Creating the element "div"
//2. Linking the class name for style
//3. Adding HTML to the div
//4. Adding the data to Li 
//5. Adding the data to the div

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);
  
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML =
      "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
  
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
  
    switch (taskDataObj.status) {
      case "to do":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
        tasksToDoEl.append(listItemEl);
        break;
      case "in progress":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
        tasksInProgressEl.append(listItemEl);
        break;
      case "completed":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
        tasksCompletedEl.append(listItemEl);
        break;
      default:
        console.log("Something went wrong!");
    }
  
    // save task as an object with name, type, status, and id properties then push it into tasks array
    taskDataObj.id = taskIdCounter;
  
    tasks.push(taskDataObj);
  
    // save tasks to localStorage
    saveTasks();
  
    // increase task counter for next unique task id
    taskIdCounter++;
  };

var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //Edit Button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    //delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    //Adding an <select> to the <div> container
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    //creating the arrary for choices for the LOOP (FOR)
    var statusChoices = ["To Do", "In Progress", "Completed"];

    //FOR LOOP ACTUAL
    for(var i = 0; i < statusChoices.length; i++){
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusSelectEl.appendChild(statusOptionEl);
    }


    return actionContainerEl;
};


var taskButtonHandler = function(event){
    var targetEl = event.target;

    //edit button is clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    //delete button is clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loopage through current taks
    for(var i = 0; i < tasks.length; i++){
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if(tasks[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        }
    }

    //reassign task array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks()
};

var editTask = function(taskId){
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

var taskStatusChangeHandler = function(event){

    //getting the task item's ID
    var taskId = event.target.getAttribute("data-task-id");

    //getting the current selected options value and converting it to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
    }

    //loop to update task's in the tasks arrary
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue;
        }
    }

    saveTasks()
};

var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function() {
    var savedTasks = localStorage.getItem("tasks");
    // if there are no tasks, set tasks to an empty array and return out of the function
    if (!savedTasks) {
      return false;
    }
    console.log("Saved tasks found!");
    // else, load up saved tasks
  
    // parse into array of objects
    savedTasks = JSON.parse(savedTasks);
  
    // loop through savedTasks array
    for (var i = 0; i < savedTasks.length; i++) {
      // pass each task object into the `createTaskEl()` function
      createTaskEl(savedTasks[i]);
    }
  };

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);

formEl.addEventListener("submit", taskFormHandler);

loadTasks();