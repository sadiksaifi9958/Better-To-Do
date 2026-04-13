let taskForm = document.querySelector(".task-form");
let taskList = document.querySelector("ol");
let taskTitleInput = document.querySelector(".task-title-input");
let dueTimeInput = document.getElementById("due-time");

function renderTask(task) {
    let taskCard = document.createElement("li");
    let titleBox = document.createElement("div");
    let taskTitle = document.createElement("h3");
    let taskPriority = document.createElement("p");
    let dueTime = document.createElement("p");
    let removeTask = document.createElement("button");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    if (task.completed) {
        checkbox.checked = true;
        taskTitle.style.textDecoration = "line-through";
        taskCard.style.opacity = "0.5";
    }

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

    taskCard.appendChild(titleBox);
    titleBox.appendChild(taskTitle);
    titleBox.appendChild(checkbox);
    taskCard.appendChild(taskPriority);
    taskCard.appendChild(dueTime);
    taskCard.appendChild(removeTask);
    taskList.appendChild(taskCard);



    checkbox.addEventListener("change", function () {

        if (checkbox.checked) {
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks = tasks.map(function (task) {
                if (task.title == taskTitle.textContent) {
                    task.completed = true;
                    return task;
                } else {
                    return task;
                }
            })
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskTitle.style.textDecoration = "line-through";
            taskCard.style.opacity = "0.5";
        } else {
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks = tasks.map(function (task) {
                if (task.title == taskTitle.textContent) {
                    task.completed = false;
                    return task;
                } else {
                    return task;
                }
            })
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskTitle.style.textDecoration = "none";
            taskCard.style.opacity = "1";
        }
    })
}

function loadTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function (task) {
        renderTask(task);
    });
}

loadTask();

taskForm.addEventListener("submit", function (e) {
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
        dueTime: dueTimeInput.value,
        completed: false
    }

    renderTask(task);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskForm.reset();
    emptyMsgShow();
});

taskList.addEventListener("click", function (event) {
    if (event.target.nodeName == "BUTTON") {
        let delTask = event.target.parentElement;
        let deleteTaskTitle = delTask.querySelector("h3").textContent;
        delTask.remove();

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(function (task) {
            return task.title !== deleteTaskTitle;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        emptyMsgShow();
    }
});

let allCardsBtn = document.querySelector(".all");
let criticalCardsBtn = document.querySelector(".critical");
let strategicCardsBtn = document.querySelector(".strategic");
let minorCardsBtn = document.querySelector(".minor");

allCardsBtn.addEventListener("click", function () {
    let allCards = document.querySelectorAll("li");

    allCards.forEach(function (e) {
        e.style.display = "";
    })
    emptyMsgShow();
})

criticalCardsBtn.addEventListener("click", function () {
    let cards = document.querySelectorAll("li");

    cards.forEach(function (e) {
        if (e.querySelector("p").textContent.includes("Critical")) {
            e.style.display = "";
        } else {
            e.style.display = "none";
        }
    })
    emptyMsgShow();
})

strategicCardsBtn.addEventListener("click", function () {
    let cards = document.querySelectorAll("li");

    cards.forEach(function (e) {
        if (e.querySelector("p").textContent.includes("Strategic")) {
            e.style.display = "";
        } else {
            e.style.display = "none";
        }
    })
    emptyMsgShow();
})

minorCardsBtn.addEventListener("click", function () {
    let cards = document.querySelectorAll("li");

    cards.forEach(function (e) {
        if (e.querySelector("p").textContent.includes("Minor")) {
            e.style.display = "";
        } else {
            e.style.display = "none";
        }
    })
    emptyMsgShow();
})

let emptyMsg = document.querySelector(".empty-msg");

function emptyMsgShow() {
    if (document.querySelectorAll("li").length === 0) {
        emptyMsg.style.display = "";
    } else {
        emptyMsg.style.display = "none";
    }
}



