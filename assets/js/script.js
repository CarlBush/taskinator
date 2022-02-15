var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");

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
//1. Creating the element "div"
//2. Linking the class name for style
//3. Adding HTML to the div
//4. Adding the data to Li 
//5. Adding the data to the div

var createTaskEl = function(taskDataObj){
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);