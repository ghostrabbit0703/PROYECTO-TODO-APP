document.addEventListener('DOMContentLoaded',function(){
    
    let listTasks=JSON.parse(localStorage.getItem("Tasks"))||[];
    let nameTask=document.getElementById("name-task");
    let descriptionTask=document.getElementById("description-task")
    let buttonCreateTask=document.getElementById("button-create-task");
    let incrementId=1;
    const areaListTask=document.querySelector(".space-crud-task");
    let editingTaskId = null;
    areaListTask.innerHTML="";  

    function saveTask() {
        const nameTaskValue = nameTask.value.trim();
        const descriptionTaskValue = descriptionTask.value.trim();

        if (!nameTaskValue || !descriptionTaskValue) {
            alert("Todos los campos son obligatorios");
            return;
        }

        if (editingTaskId === null) {
            const task = {
                id: incrementId,
                name: nameTaskValue,
                description: descriptionTaskValue,
                checked: false
            };

            listTasks.push(task);
            incrementId++;

            alert("La tarea fue creada correctamente");
        } else {
            const taskFound = listTasks.find(
                task => task.id === editingTaskId
            );

            if (!taskFound) {
                alert("No se encontró la tarea");
                return;
            }

            taskFound.name = nameTaskValue;
            taskFound.description = descriptionTaskValue;

            editingTaskId = null;
            buttonCreateTask.textContent = "Agregar tarea";

            alert("La tarea fue actualizada correctamente");
        }

        localStorage.setItem("Tasks", JSON.stringify(listTasks));

        nameTask.value = "";
        descriptionTask.value = "";

        renderListTask();
    }
    function renderListTask() {
    areaListTask.innerHTML = listTasks.map(item => `
        <div class="row-list-task">
            <div class="content-task">
                <input
                    type="checkbox"
                    class="checkbox-list-task"
                    data-task-id="${item.id}"
                    ${item.checked ? "checked" : ""}
                >

                <div class="text-task">
                    <h3 class="name-task-list ${item.checked ? "completed-task" : ""}">
                        ${item.name}
                    </h3>

                    <p class="description-task-list ${item.checked ? "completed-task" : ""}">
                        ${item.description}
                    </p>
                </div>
            </div>

            <div class="action-task-list">
                <button class="button-view-task" data-task-id="${item.id}">
                    Ver
                </button>

                <button class="button-edit-task" data-task-id="${item.id}">
                    Editar
                </button>

                <button class="button-delete-task" data-task-id="${item.id}">
                    Eliminar
                </button>
            </div>
        </div>

        <hr>
    `).join("");
}
areaListTask.addEventListener("click", event => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.taskId);

    if (button.classList.contains("button-view-task")) {
        viewTask(id);
    } else if (button.classList.contains("button-edit-task")) {
        editTask(id);
    } else if (button.classList.contains("button-delete-task")) {
        deleteTask(id);
    }
});

areaListTask.addEventListener("change", event => {
    if (!event.target.classList.contains("checkbox-list-task")) {
        return;
    }

    const id = Number(event.target.dataset.taskId);
    const taskFound = listTasks.find(task => task.id === id);

    if (!taskFound) {
        return;
    }

    taskFound.checked = event.target.checked;

    localStorage.setItem("Tasks", JSON.stringify(listTasks));

    renderListTask();
});

    function viewTask(id) {
        const taskFound = listTasks.find(task => task.id === id);
        if (!taskFound) {
            alert("No se encontró la tarea");
            return;
        }

        alert(
            `Nombre: ${taskFound.name}\nDescripción: ${taskFound.description}`
        );
    }

    function editTask(id) {
        const taskFound = listTasks.find(task => task.id === id);

        if (!taskFound) {
            alert("No se encontró la tarea");
            return;
        }

        nameTask.value = taskFound.name;
        descriptionTask.value = taskFound.description;

        editingTaskId = id;

        buttonCreateTask.textContent = "Guardar cambios";

        nameTask.focus();
    }


    function deleteTask(id) {
    const taskIndex = listTasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            alert("No se encontró la tarea");
            return;
        }

        listTasks.splice(taskIndex, 1);

        localStorage.setItem("Tasks", JSON.stringify(listTasks));

        renderListTask();
        alert("se elimino el registro ")
        location.reload();
        
    }

    renderListTask();

    
  
    buttonCreateTask.addEventListener("click", saveTask);


    if (listTasks.length > 0) {
            incrementId = Math.max(...listTasks.map(task => task.id)) + 1;
    }

    
    //localStorage.clear();


})

