let golobalTaskData = [];

taskContents = document.getElementById('taskContents')
taskContents = document.getElementById('taskContents')

const addCard = () => {
  const newTaskDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("taskDescription").value,
  };

  taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));

  golobalTaskData.push(newTaskDetails);
  saveToLocalStorage();
};

const generateTaskCard = ({id,  title, url, type, description}) => {
    return `<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card card_shodow">
            <div class="card-header">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-primary"  name=${id} onclick="editTask(this)">
                        <i class="fas fa-pencil-alt"></i>
                    </button>&nbsp;&nbsp;
                    <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <img src=${url} alt="card-image"
                class="card-img-top">
            <div class="card-body">
                <h5 class="card-title" >${title}</h5>
                <p class="card-text">${description}</p>
                <span class="badge bg-primary">${type}</span>
            </div>
            <div class="card-footer">
               <hr class="hr">
            </div>
        </div>
    </div>`;
};

const saveToLocalStorage = () => {
    localStorage.setItem(
        "tasky", 
        JSON.stringify({ tasks: golobalTaskData }));
};

const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky"));
    console.log(localStorageCopy);
    if(localStorageCopy){
        golobalTaskData = localStorageCopy["tasks"];
    }
    console.log(golobalTaskData);
    golobalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
    });
};

const deleteTask = (e) => {
    // console.log(e);
    const targetID = e.getAttribute("name");
    // console.log(targetID);
    const removeTask = golobalTaskData.filter((cardData) => cardData.id !== targetID);
    golobalTaskData = removeTask;
    // console.log(golobalTaskData);
    saveToLocalStorage();
    window.location.reload();

    
}


const editTask = (e) => {
    const targetID = e.getAttribute("name");
    e.childNodes[1].classList.remove("fa-pencil-alt");
    e.childNodes[1].classList.add("fa-check");
    console.log(targetID);

    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true");

    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "Save Changes";

    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].focus();
    console.log(e.childNodes[1]);
    e.setAttribute("onclick", "saveEditTask(this)");
}


const saveEditTask = (e) => {
    const targetID = e.getAttribute("name");
    const title = e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1];
    const description = e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3];
    const type = e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5];

    console.log(title);
    console.log(description);
    console.log(type);

    const updateData = {
        title: title.innerHTML,
        type: type.innerHTML,
        description: description.innerHTML,
        
    };

    // console.log({ updateData, targetID });

    const updateedTask = golobalTaskData.map((task) => {
        console.log(task.id);
        if (task.id === targetID) {
          console.log({ ...task, ...updateData });
          return { ...task, ...updateData };
        }
        return task;
    });
  
    golobalTaskData = updateedTask;

    saveToLocalStorage()

    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "false");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "false");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "false");

    e.childNodes[1].classList.remove("fa-check");
    e.childNodes[1].classList.add("fa-pencil-alt");
    e.setAttribute("onclick", "editTask(this)");
}
