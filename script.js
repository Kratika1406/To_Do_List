const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => createTask(task.text, task.done));
};

function addTask() {
  if (input.value.trim() === "") return;

  createTask(input.value, false);
  saveTasks();
  input.value = "";
}

function createTask(text, done) {
  const li = document.createElement("li");
  li.innerText = text;

  if (done) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const del = document.createElement("span");
  del.innerText = "✖";
  del.classList.add("delete");

  del.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(del);
  list.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}