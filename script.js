let tasks = [];

const addTask = () => {
  const taskName = document.getElementById("taskName").value.trim();
  const dueDate = document.getElementById("dueDate").value;
  const status = document.getElementById("status").value;

  if (!taskName || !dueDate) {
    alert("Please enter task name and date");
    return;
  }

  tasks.push({
    name: taskName,
    date: dueDate,
    status: status,
  });

  document.getElementById("taskName").value = "";
  document.getElementById("dueDate").value = "";

  renderTasks();
};

const renderTasks = () => {
  const filter = document.getElementById("filter").value;
  const today = new Date().toISOString().split("T")[0];

  let filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "upcoming") {
      return task.date >= today;
    } else {
      return task.date < today;
    }
  });

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    taskList.innerHTML = "<p>No tasks found.</p>";
    return;
  }

  filteredTasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerHTML = `
      <strong>${task.name}</strong><br>
      Due: ${task.date}<br>
      Status: ${task.status}
    `;
    taskList.appendChild(taskDiv);
  });
};
