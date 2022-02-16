var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");
var taskIdCounter = 0;

var taskFormHandler = function() {
event.preventDefault();
var taskNameInput = document.querySelector("input[name='task-name']").value;
var taskTypeInput = document.querySelector("select[name='task-type']").value;

 // package up data as an object
var taskDataOjb = {
    name: taskNameInput,
    type: taskTypeInput
};

//check if input is empty
if(!taskNameInput || !taskTypeInput) {
    alert("You need to fill the form out yo!");
    return false;
}

formEl.reset();

// send it as an argument to createTaskEl
createTaskEl(taskDataOjb);

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

var createTaskEl = function(taskDataObj){
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //adding a task custom attribute
    listItemEl.setAttribute("data-task-id",taskIdCounter);

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    //increase the task counter for the next unique id
    taskIdCounter++;
}

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


formEl.addEventListener("submit", taskFormHandler);