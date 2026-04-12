let taskForm = document.querySelector(".task-form");
let taskList = document.querySelector("ol");
let taskTitleInput = document.querySelector(".task-title-input");
let dueTimeInput = document.getElementById("due-time");

function renderTask(task) {
    let taskCard = document.createElement("li");
    let taskTitle = document.createElement("h3");
    let taskPriority = document.createElement("p");
    let dueTime = document.createElement("p");
    let removeTask = document.createElement("button");

    taskTitle.textContent = task.title;
    taskPriority.textContent = `Priority: ${task.priority}`;

    if (task.dueTime) {
        dueTime.textContent = `Due Time: ${task.dueTime}`;
    } else {
        dueTime.textContent = "No due time set";
        dueTime.style.fontStyle = "italic";
    }

    if (task.priority === "Critical") taskPriority.style.color = "#e74c3c";
    if (task.priority === "Strategic") taskPriority.style.color = "#f39c12";
    if (task.priority === "Minor") taskPriority.style.color = "#2ecc71";

    if (task.priority === "Critical") taskCard.style.borderLeft = "4px solid #e74c3c";
    if (task.priority === "Strategic") taskCard.style.borderLeft = "4px solid #f39c12";
    if (task.priority === "Minor") taskCard.style.borderLeft = "4px solid #2ecc71";

    removeTask.textContent = "Remove Task";

    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskPriority);
    taskCard.appendChild(dueTime);
    taskCard.appendChild(removeTask);
    taskList.appendChild(taskCard);
}

function loadTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        renderTask(task);
    });
}

loadTask();

taskForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let taskPriorityInput = document.querySelector('input[name="task-priority"]:checked');

    // validation
    if (!taskTitleInput.value.trim()) {
        alert("Please enter a task.");
        return;
    }
    if (!taskPriorityInput) {
        alert("Please select a priority.");
        return;
    }

    const task = {
        title: taskTitleInput.value,
        priority: taskPriorityInput.value,
        dueTime: dueTimeInput.value
    }

    renderTask(task);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskForm.reset();
});

taskList.addEventListener("click", function(event) {
    if (event.target.nodeName == "BUTTON") {
        let delTask = event.target.parentElement;
        let deleteTaskTitle = delTask.querySelector("h3").textContent;
        delTask.remove();

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(function(task) {
            return task.title !== deleteTaskTitle;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});