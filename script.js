let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("taskInput").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;
  const category = document.getElementById("category").value;

  if (text === "") return;

  tasks.push({
    text,
    dueDate,
    priority,
    category,
    completed: false
  });

  saveTasks();
  renderTasks();
  clearInputs();
}

function clearInputs() {
  document.getElementById("taskInput").value = "";
  document.getElementById("dueDate").value = "";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function searchTasks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  renderTasks(query);
}

function renderTasks(filter = "") {
  taskList.innerHTML = "";

  tasks
    .filter(task => task.text.toLowerCase().includes(filter))
    .forEach((task, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span class="${task.completed ? "completed" : ""}">
          ${task.text}
          <small>[${task.category}] | ${task.priority} | Due: ${task.dueDate || "N/A"}</small>
        </span>
        <div>
          <button onclick="toggleTask(${index})">✔</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      `;

      taskList.appendChild(li);
    });
}

renderTasks();
