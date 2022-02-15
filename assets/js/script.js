var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");

var createTaskHandler = function() {
event.preventDefault();
var taskNameInput = document.querySelector("input[name='task-name']").value;
var taskTypeInput = document.querySelector("select[name='task-type']").value;

//1. Creating the element "Li"
//2. Linking the class name for style
//3. Retriving the actual data first from varible "taskNameInput" then from the value
//4. Adding the data to site per child->parent
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = taskNameInput; //this might be able to be removed
    tasksToDoEl.appendChild(listItemEl); //this might be able to be removed//

//1. Creating the element "div"
//2. Linking the class name for style
//3. Adding HTML to the div
//4. Adding the data to Li 
//5. Adding the data to the div
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);