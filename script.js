// Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");


// Local Storage


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Events


addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Add Task


function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        time: new Date().toLocaleString()
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";
}


// Render Tasks


function renderTasks() {

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-text">
                <strong>${task.text}</strong>
                <div class="timestamp">
                    Added : ${task.time}
                </div>
            </div>

            <div class="buttons">

                ${!task.completed ? `<button class="complete">Complete</button>` : ""}

                <button class="edit">Edit</button>

                <button class="delete">Delete</button>

            </div>
        `;

        // Complete
        const completeBtn = li.querySelector(".complete");

        if (completeBtn) {

            completeBtn.addEventListener("click", function () {

                task.completed = true;

                saveTasks();

                renderTasks();

            });

        }

        // Edit
        li.querySelector(".edit").addEventListener("click", function () {

            const newTask = prompt("Edit Task", task.text);

            if (newTask && newTask.trim() !== "") {

                task.text = newTask.trim();

                saveTasks();

                renderTasks();

            }

        });

        // Delete
        li.querySelector(".delete").addEventListener("click", function () {

            tasks = tasks.filter(t => t.id !== task.id);

            saveTasks();

            renderTasks();

        });

        if (task.completed) {

            completedList.appendChild(li);

        } else {

            pendingList.appendChild(li);

        }

    });

    updateCounts();

}


// Update Counts


function updateCounts() {

    pendingCount.textContent = pendingList.children.length;

    completedCount.textContent = completedList.children.length;

    pendingEmpty.style.display =
        pendingList.children.length === 0 ? "block" : "none";

    completedEmpty.style.display =
        completedList.children.length === 0 ? "block" : "none";

}


// Save Tasks


function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// Load Tasks


renderTasks();