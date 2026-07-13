document.addEventListener('DOMContentLoaded',function(){
    
    let listTasks=JSON.parse(localStorage.getItem("Tasks"))||[];
    let nameTask=document.getElementById("name-task");
    let descriptionTask=document.getElementById("description-task")
    let buttonCreateTask=document.getElementById("button-create-task");
    let incrementId=1;
    const areaListTask=document.querySelector(".space-crud-task");
        areaListTask.innerHTML="";
        


    
    function createTask(nameTask ,descriptionTask){
        const nameTaskValue = nameTask.value;
        const descriptionTaskValue = descriptionTask.value;
        
        if (!nameTaskValue.trim() || !descriptionTaskValue.trim()) {
            alert('Todos los campos son obligatorios');
            return;
        }
        const task={
            id:incrementId,
            name: nameTaskValue,          
            description: descriptionTaskValue,
            checked: false
        };
        listTasks.push(task)

        localStorage.setItem("Tasks", JSON.stringify(listTasks));
        nameTask.value = '';
        descriptionTask.value = '';
        incrementId++;
        alert("su registro fue exitoso");
        renderListTask();
        location.reload();
        
    }

    function renderListTask(){
        
        listTasks.forEach(item=>{
            const rowListTask=document.createElement("div");
            const contentTaskElement=document.createElement("div");
            const checkBoxTaskElement=document.createElement("input");
            const textTaskElement = document.createElement("div");
            const nameTaskElement=document.createElement("h3");
            const descriptionTaskElement=document.createElement("p");
            const actionTaskElement=document.createElement("div");
            const buttonView=document.createElement("button");
            const buttonEdit=document.createElement("button");
            const buttonDelete=document.createElement("button");


            checkBoxTaskElement.type = "checkbox";

            rowListTask.classList.add("row-list-task");
            checkBoxTaskElement.classList.add("checkbox-list-task");
            contentTaskElement.classList.add("content-task");
            textTaskElement.classList.add("text-task");
            nameTaskElement.classList.add("name-task-list");
            descriptionTaskElement.classList.add("description-task-list");
            actionTaskElement.classList.add("action-task-list");

            buttonView.classList.add("button-view-task");
            buttonEdit.classList.add("button-edit-task");
            buttonDelete.classList.add("button-delete-task"); 

            buttonView.dataset.taskId=item.id;
            buttonEdit.dataset.taskId = item.id;
            buttonDelete.dataset.taskId = item.id;

            nameTaskElement.textContent=`${item.name}`;
            descriptionTaskElement.textContent=`${item.description}`;
            buttonView.textContent="Ver";
            buttonEdit.textContent="Editar";
            buttonDelete.textContent="Eliminar";

            checkBoxTaskElement.addEventListener("change", () => {

                if (checkBoxTaskElement.checked) {
                    nameTaskElement.style.textDecoration = "line-through";
                    descriptionTaskElement.style.textDecoration ="line-through";
                } else {
                    nameTaskElement.style.textDecoration = "none";
                    descriptionTaskElement.style.textDecoration ="none";               
                }

            });

            buttonView.addEventListener("click", () => {
                viewTask(item.id);
            });

            buttonEdit.addEventListener("click", () => {
                editTask(item.id);
            });

            buttonDelete.addEventListener("click", () => {
                deleteTask(item.id);
            });

            textTaskElement.appendChild(nameTaskElement);
            textTaskElement.appendChild(descriptionTaskElement);

            contentTaskElement.appendChild(checkBoxTaskElement);
            contentTaskElement.appendChild(textTaskElement);

            actionTaskElement.appendChild(buttonView);
            actionTaskElement.appendChild(buttonEdit);
            actionTaskElement.appendChild(buttonDelete);

            rowListTask.appendChild(contentTaskElement);
            rowListTask.appendChild(actionTaskElement);

            areaListTask.appendChild(rowListTask);
            areaListTask.appendChild(document.createElement("hr"))
        })
    }


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

    function editTask(id){
        const taskFound = listTasks.find(task => task.id === id);
        if (!taskFound) {
            alert("No se encontró la tarea");
            return;
        }
        
        let newNameTask=prompt(`ingresa el nuevo valor para la tarea: ${taskFound.name}`);
        let newDescriptionTask=prompt(`ingresa el nuevo valor para la descripcion: ${taskFound.description}`);

        if (newNameTask === null || newDescriptionTask === null) {
            return;
        }

        if (!newNameTask.trim() || !newDescriptionTask.trim()) {
            alert("Los campos no pueden estar vacíos");
            return;
        }

        taskFound.name = newNameTask.trim();
        taskFound.description = newDescriptionTask.trim();
        localStorage.setItem("Tasks", JSON.stringify(listTasks));

        renderListTask();
        location.reload();

        //alert("se actualizo la tarea");
        
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

    
  
    buttonCreateTask.addEventListener('click',()=>{
        createTask( nameTask,descriptionTask);
    })


    if (listTasks.length > 0) {
            incrementId = Math.max(...listTasks.map(task => task.id)) + 1;
    }

    
    //localStorage.clear();


})

