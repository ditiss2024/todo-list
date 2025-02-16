// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskInput.value}</span>
        <button onclick="removeTask(this)">❌</button>
    `;
    
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function toggleComplete(task) {
    task.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        let tasks = JSON.parse(savedTasks);
        let taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = `
                <span onclick="toggleComplete(this)" class="${task.completed ? 'completed' : ''}">
                    ${task.text}
                </span>
                <button onclick="removeTask(this)">❌</button>
            `;
            taskList.appendChild(li);
        });
    }
}
