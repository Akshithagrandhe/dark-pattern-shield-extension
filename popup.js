const taskList = document.getElementById("taskList");

function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (task === "") return;

    const li = document.createElement("li");
    li.textContent = task;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✓";

    doneBtn.onclick = () => {
        li.style.textDecoration = "line-through";
        saveTasks();
    };

    li.appendChild(doneBtn);
    taskList.appendChild(li);

    input.value = "";

    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push(li.firstChild.textContent);
    });

    chrome.storage.local.set({ tasks });
}

function loadTasks() {
    chrome.storage.local.get(["tasks"], (result) => {
        if (result.tasks) {
            result.tasks.forEach(task => {
                const li = document.createElement("li");
                li.textContent = task;

                const doneBtn = document.createElement("button");
                doneBtn.textContent = "✓";

                doneBtn.onclick = () => {
                    li.style.textDecoration = "line-through";
                    saveTasks();
                };

                li.appendChild(doneBtn);
                taskList.appendChild(li);
            });
        }
    });
}

loadTasks();