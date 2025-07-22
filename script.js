document.addEventListener("DOMContentLoaded", () => {
      let tasks = [];

      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
      }

      document.getElementById("addTaskBtn").addEventListener("click", addTask);

      function addTask() {
        const taskName = document.getElementById("taskName").value.trim();
        const dueDate = document.getElementById("dueDate").value;

        if (!taskName || !dueDate) {
          alert("Please enter task name and date");
          return;
        }

        const task = {
          name: taskName,
          date: dueDate,
        };

        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        document.getElementById("taskName").value = "";
        document.getElementById("dueDate").value = "";

        renderTasks();
      }

      function renderTasks() {
        const today = new Date();
        const completed = document.getElementById("completedTasks");
        const pending = document.getElementById("pendingTasks");

        completed.innerHTML = "";
        pending.innerHTML = "";

        tasks.forEach((task) => {
          const taskDate = new Date(task.date);
          const daysLeft = Math.ceil((taskDate - today) / (24 * 60 * 60 * 1000));

          const li = document.createElement("li");
          li.textContent = `${task.name} - Due: ${task.date}`;

          if (daysLeft < 0) {
            completed.appendChild(li);
          } else {
            pending.appendChild(li);
          }
        });
      }
    });