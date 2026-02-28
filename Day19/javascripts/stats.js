// LOAD TASKS
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ELEMENTS
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const overdueTasks = document.getElementById("overdueTasks");
const completionBar = document.getElementById("completionBar");
const completionPercent = document.getElementById("completionPercent");

// CALCULATIONS
const total = tasks.length;
const completed = tasks.filter(task => task.completed).length;
const pending = total - completed;

const today = new Date().toISOString().split("T")[0];

const overdue = tasks.filter(task =>
    task.dueDate &&
    task.dueDate < today &&
    !task.completed
).length;

const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

// UPDATE UI
totalTasks.textContent = total;
completedTasks.textContent = completed;
pendingTasks.textContent = pending;
overdueTasks.textContent = overdue;

completionBar.style.width = percent + "%";
completionPercent.textContent = percent + "% Completed";