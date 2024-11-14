alert("hii")
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    document.getElementById("addTaskBtn").addEventListener("click", addTask);
    document.getElementById("searchInput").addEventListener("input", filterTasks);
    document.getElementById("showAll").addEventListener("click", () => showTasks("all"));
    document.getElementById("showCompleted").addEventListener("click", () => showTasks("completed"));
    document.getElementById("showPending").addEventListener("click", () => showTasks("pending"));
});


let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();
    if (taskName) {
        const newTask = { id: Date.now(), name: taskName, completed: false };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks(filteredTasks = tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.className = "task";
        if (task.completed) taskItem.classList.add("completed");

        taskItem.innerHTML = `
            <span>${task.name}</span>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="toggleCompletion(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
        `;
        taskList.appendChild(taskItem);
    });

    document.getElementById("noTasksMessage").style.display = filteredTasks.length ? "none" : "block";
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newTaskName = prompt("Edit Task:", task.name);
    if (newTaskName) {
        task.name = newTaskName;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleCompletion(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function showTasks(filter) {
    let filteredTasks;
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else {
        filteredTasks = tasks;
    }
    renderTasks(filteredTasks);
}

function filterTasks() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchTerm));
    renderTasks(filteredTasks);
}


