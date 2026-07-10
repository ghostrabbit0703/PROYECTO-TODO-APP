document.addEventListener('DOMContentLoaded',function(){
    let listTasks=JSON.parse(localStorage.getItem("Tasks"))||[];
    let nameTask=document.getElementById("name-task");
    let descriptionTask=document.getElementById("description-task")
    let buttonCreateTask=document.getElementById("button-create-task");
    let incrementId=1;
    
    function createTask(nameTask ,descriptionTask){
        const nameTaskValue = nameTask.value;
        const descriptionTaskValue = nameTask.value;
        
        if (!nameTaskValue.trim() || !descriptionTaskValue.trim()) {
            alert('Todos los campos son obligatorios');
            return;
        }
        const task={
            id:incrementId,
            name: nameTaskValue,          
            description: descriptionTaskValue
        };
        listTasks.push(task)

        localStorage.setItem("Tasks", JSON.stringify(listTasks));
        nameTask.value = '';
        descriptionTask.value = '';
        incrementId++;
        alert("su registro fue exitoso");
        renderListTask();
        
    }

    function renderListTask(){
        const areaListTask=document.querySelector(".space-crud-task");
        areaListTask.innerHTML="";
        listTasks.forEach(item=>{
            const rowListTask=document.createElement("div")
            const nameTaskElement=document.createElement("div");
            const descriptionTaskElement=document.createElement("div");
            const actionTaskElement=document.createElement("div");
            const buttonView=document.createElement("button");
            const buttonEdit=document.createElement("button");
            const buttonDelete=document.createElement("button");


            rowListTask.classList.add("row-list-task");
            nameTaskElement.classList.add("name-task-list");
            descriptionTask.classList.add("description-task-list");
            actionTaskElement.classList.add("action-task-list");
            buttonView.id="button-view-task";
            buttonEdit.id="button-edit-task";
            buttonDelete.id="button-delete-task";


            nameTaskElement.textContent=`${item.name}`;
            descriptionTaskElement.textContent=`${item.description}`;
            buttonView.textContent="Ver"
            buttonEdit.textContent="Editar"
            buttonDelete.textContent="Eliminar"

            actionTaskElement.appendChild(buttonView);
            actionTaskElement.appendChild(buttonEdit);
            actionTaskElement.appendChild(buttonDelete);


            rowListTask.appendChild(nameTaskElement);
            rowListTask.appendChild(descriptionTaskElement);
            rowListTask.appendChild(actionTaskElement);

            areaListTask.appendChild(rowListTask);
            areaListTask.appendChild(document.createElement("hr"))
        })
    }
    renderListTask();

      if (listTasks.length > 0) {
            countOperation = listTasks[listTasks.length - 1].number + 1;
        };
  
    buttonCreateTask.addEventListener('click',()=>{
        createTask( nameTask,descriptionTask);
    })
    //localStorage.clear();

})

