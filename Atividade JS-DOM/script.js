document.getElementById("addButton").addEventListener("click", function () {
    const taskInput = document.getElementById("taskInput");
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const label = document.createElement("label");
        label.textContent = taskValue;

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                li.classList.add("completed");
            } else {
                li.classList.remove("completed");
            }

            sortTasks()
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remover";
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click", function () {
            li.remove();
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteButton);
        document.getElementById("taskList").appendChild(li);

        taskInput.value = "";
    } else {
        alert("Por favor, insira uma tarefa.");
    }
});

function sortTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.children);

    tasks.sort(function (a, b) {
        return a.classList.contains("completed") - b.classList.contains("completed");
    });

    taskList.innerHTML = "";
    tasks.forEach(function (task) {
        taskList.appendChild(task);
    });
}