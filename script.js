// let body = document.querySelector("body");
// let addBtn = document.querySelector("button");
// let ol = document.querySelector("ol");
// let input = document.querySelector("input");
// let select = document.querySelector("select");
// let taskCard  = document.querySelector(".Task-Card");

// addBtn.addEventListener("click", function() {
//   let taskCard = document.createElement("div");
//   let taskPriority = document.createElement("p");
//   let dueTime = document.createElement("p");

//   li.innerText = input.value;

//   let delBtn = document.createElement("button");
//   delBtn.innerText = "Remove Task";

//   ol.appendChild(taskCard);
//   li.appendChild(delBtn);
//   input.value = "";

//   let priority = document.createElement("p");
//   p.innerText = select.value;
//   li.appendChild(priority);

// });

// ol.addEventListener("click", function(event){
//   if(event.target.nodeName == "BUTTON"){
//     let delTask = event.target.parentElement;
//     delTask.remove();
//   }
// });

// taskCard.addEventListener("mouseEnter", {
// })

let taskForm = document.querySelector(".task-form");
let taskList = document.querySelector("ol");
let taskTitleInput = document.querySelector(".task-title-input");
let addTaskBtn = document.querySelector(".add-task");

let dueTimeInput = document.getElementById("due-time");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let taskPriorityInput = document.querySelector('input[name="task-priority"]:checked');
  let taskCard = document.createElement("li");
  let taskTitle = document.createElement("h3");
  let taskPriority = document.createElement("p");
  let dueTime = document.createElement("p");
  let removeTask = document.createElement("button");

  taskTitle.textContent = taskTitleInput.value;
  taskTitle.style.color = "#ECDFCC";
  taskPriority.textContent = `Priority: ${taskPriorityInput.value}`;
  dueTime.textContent = `Due Time: ${dueTimeInput.value}`;
  removeTask.textContent = "Remove Task";

  taskCard.appendChild(taskTitle);
  taskCard.appendChild(taskPriority);
  taskCard.appendChild(dueTime);
  taskCard.appendChild(removeTask);
  taskList.appendChild(taskCard);
  taskForm.reset();
})

taskList.addEventListener("click", function (event) {
  if (event.target.nodeName == "BUTTON") {
    let delTask = event.target.parentElement;
    delTask.remove();
  }
});