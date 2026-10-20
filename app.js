let timeLeft = 25 * 60;
let timerId = null;
let isRunning = false;

const minutesElem = document.getElementById("minutes");
const secondsElem = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("pomodoroTasks")) || [];

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesElem.textContent = String(minutes).padStart(2, "0");
    secondsElem.textContent = String(seconds).padStart(2, "0");
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    
    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerId);
            isRunning = false;
            alert("Süre bitti! Harika iş çıkardın, şimdi 5 dakika mola verme vakti.");
            timeLeft = 25 * 60;
            updateTimerDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

// Görev Yönetimi
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span onclick="toggleTask(${index})" style="cursor:pointer;">${task.text}</span>
            <div class="task-actions">
                <button onclick="deleteTask(${index})">Sil</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    localStorage.setItem("pomodoroTasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        renderTasks();
    }
});

window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

window.deleteTask = function(index) {
    tasks.splice(index, 1);
    renderTasks();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimerDisplay();
renderTasks();