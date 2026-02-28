// ==========================
// SELECTORS
// ==========================
const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

// ==========================
// STATE
// ==========================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// ==========================
// SAVE FUNCTION
// ==========================
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==========================
// RENDER TASKS
// ==========================
function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        // TASK CONTENT
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("task-content");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        const dueDate = document.createElement("span");
        dueDate.classList.add("due-date");
        dueDate.textContent = task.dueDate
            ? `Due: ${task.dueDate}`
            : "No due date";

        contentDiv.appendChild(taskText);
        contentDiv.appendChild(dueDate);

        // TOGGLE COMPLETE
        contentDiv.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // ACTION BUTTONS CONTAINER
        const actionDiv = document.createElement("div");

        // EDIT BUTTON
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const newText = prompt("Edit task:", task.text);
            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
                saveTasks();
                renderTasks();
            }
        });

        // DELETE BUTTON
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(tasks.indexOf(task), 1);
            saveTasks();
            renderTasks();
        });

        actionDiv.appendChild(editBtn);
        actionDiv.appendChild(deleteBtn);

        li.appendChild(contentDiv);
        li.appendChild(actionDiv);

        taskList.appendChild(li);
    });
}

// ==========================
// ADD TASK
// ==========================
addTaskBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (text === "") return;

    tasks.push({
        text,
        dueDate,
        completed: false
    });

    taskInput.value = "";
    dueDateInput.value = "";

    saveTasks();
    renderTasks();
});

// ENTER KEY
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});

// ==========================
// FILTER BUTTONS
// ==========================
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        document.querySelector(".filter-btn.active")
            .classList.remove("active");

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// INITIAL LOAD
renderTasks();