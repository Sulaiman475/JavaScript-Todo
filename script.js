


let userName;
let tasks = [];


///////////////////// Home Elements //////////////////////////////////
let homeForm = document.getElementById("home-form");
let homeInput = document.getElementById("home-form_input");
let homeButton = document.getElementById("home-form_button");
let error = document.querySelector(".error");
let headingName = document.querySelector(".headingName");

let accountContainer = document.querySelector(".account_container");
let homeContainer = document.querySelector('.home_container');



///////////////////// Add Task Elements //////////////////////////////////
let addTaskForm = document.querySelector("#addtask-form");
let taskinput = document.querySelector("#addtask-form_input");
let taskButton = document.querySelector("#addtask-form_button");
let listDiv = document.getElementsByClassName("list_div")
// console.log(listDiv)


///////////////////// Clear Button //////////////////////////////////
const clearBtn = document.querySelector('#clear-btn');
const deleteAccountBtn = document.querySelector('#deleteAccount-btn');


///////////////////// Single Task Crud Operations  //////////////////////////
let checkTaskBtn = document.getElementsByClassName('fa-check');
let updateTaskBtn = document.getElementsByClassName('fa-pen');
let deleteTaskBtn = document.getElementsByClassName('fa-trash-can');
let listContainerMain = document.querySelectorAll('.list_container');
let updateBtn = document.querySelector('#updateTaskButton');


function deleteAccount() {
    tasks = [];
    userName = "";
    accountContainer.style.opacity = 0;
    homeContainer.style.display = "block";

}

function clearAllTasks() {
    tasks = [];
    updateUI();
}


const checkTask = (e) => {
    let el = e.target.closest('.list_container');

    let checkID = Number(el.getAttribute("data-custom-id"));
    tasks.map(elem => {
        if(elem.id === checkID) {
            elem.completed = true;
        }
    })
    updateUI();
}

const deleteTask = (e) => {
    let el = e.target.closest('.list_container');
    let deleteID = Number(el.getAttribute("data-custom-id"));

    let newTasks = tasks.filter(elem => elem.id !== deleteID);
    tasks = [...newTasks];
    updateUI();
}

const updateTask = (e) => {
    let el = e.target.closest('.list_container');
    let taskText = el.querySelector('p').innerText;
    
    const addTaskContainer = document.createElement('div');
    addTaskContainer.classList.add('addtask_container');

    const updateInput = document.createElement('input');
    updateInput.classList.add('input');
    updateInput.id = 'updateTaskID';
    updateInput.value = taskText;
    
    const updateTaskBtn = document.createElement('button');
    updateTaskBtn.classList.add('primary_button');
    updateTaskBtn.id = 'updateTaskButton';
    updateTaskBtn.innerText = 'Update';
    
    el.innerHTML = '';

    addTaskContainer.appendChild(updateInput);
    addTaskContainer.appendChild(updateTaskBtn);

    el.appendChild(addTaskContainer);

    updateTaskBtn.addEventListener('click', updateAcctualTask)
}

const updateAcctualTask = (e) => {
    let el = e.target.closest('.list_container');
    let updateID = Number(el.getAttribute("data-custom-id"));

    const updatedTaskText = el.querySelector('.input').value;

    tasks.map(elem => {
        if(elem.id === updateID) {
            elem.task = updatedTaskText;
        }
    })

    el.innerHTML = '';

    updateUI();

}


const homeFormSubmit = (e) => {
    e.preventDefault()
    if(homeInput.value.length < 3) {
        error.style.opacity = 1;
    } else{
        error.style.opacity = 0;
        accountContainer.style.opacity = 1;
        userName= homeInput.value;
        homeInput.value = "";
        headingName.textContent = userName;
        homeButton.style.display = "none";
        homeContainer.style.display = 'none'
    }
}


const handleHomeInput = (e) => {
    if(e.target.value.length >= 3) {
        homeButton.style.display = "inline-block"
        error.style.opacity = 0;
    }
    if(e.target.value.length < 3) {
        homeButton.style.display = "none";
    }
}

const addNewTask = (e) => {
    e.preventDefault();
    let form = e.target;
    let formInput = form.querySelector('.input');

    if(formInput.value.length < 1) return;

    const newTask = {
        task: formInput.value,
        completed: false,
        id: new Date().getTime()
    };

    tasks.push(newTask);
    formInput.value = '';
    updateUI();
}

homeForm.addEventListener('submit', homeFormSubmit);

homeInput.addEventListener('input', handleHomeInput);

addTaskForm.addEventListener("submit", addNewTask);

clearBtn.addEventListener('click', clearAllTasks);

deleteAccountBtn.addEventListener('click', deleteAccount);

// addTaskForm.addEventListener("submit", addNewTask);






function updateUI() {
    /////////////////////////   HTML   ////////////////////
    listDiv[0].innerHTML = '';
    
    tasks.map(elem => {
        // console.log(tasks)
        ///////////////////   Creatig Container for task //////////////////
        const listContainer = document.createElement('div');
        listContainer.classList.add('list_container');
        listContainer.setAttribute('data-custom-id', `${elem.id}`);
        
        ///////////////////   Filling task text  //////////////////
        const taskText = document.createElement('p');
        taskText.innerText = `${elem.task}`;
        taskText.classList.add(`${elem.completed && 'completed'}`);
        // console.log("object");
        
        ///////////////////   Creating crud Buttons for task  //////////////////
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('button_container');
        btnContainer.innerHTML = `
        <i class="fa-solid fa-check button_round1 checkBtn"></i>
        <i class="fa-solid fa-pen button_round2 updateBtn"></i>
        <i class="fa-solid fa-trash-can button_round2 deleteBtn"></i>
        `
        listContainer.appendChild(taskText);
        listContainer.appendChild(btnContainer);
        
        listDiv[0].appendChild(listContainer);

        let HTMLs = `
            <div class='list_container' data-custom-id="a">
                            
                <p class="a">{taskText}</p>
                <div class='button_container'>
                    <i class="fa-solid fa-check button_round1 checkBtn" id="checkBtn"></i>
                    <i class="fa-solid fa-pen button_round2 updateBtn" id="updateBtn"></i>
                    <i class="fa-solid fa-trash-can button_round2 deleteBtn" id="deleteBtn"></i>
                </div>
            </div>
        `;
        console.log(listDiv)

        // listDiv[0].insertAdjacentElement('afterbegin', HTMLs);
        
    })

    
    /////////////////////////   HTML   ////////////////////
    for (var i = 0; i < checkTaskBtn.length; i++) {
        let element = checkTaskBtn[i];
    
    
        // Add an event listener to each element
        element.addEventListener("click", checkTask);
    }

    for (var i = 0; i < deleteTaskBtn.length; i++) {
        let element = deleteTaskBtn[i];
    
    
        // Add an event listener to each element
        element.addEventListener("click", deleteTask);
    }

    for (var i = 0; i < updateTaskBtn.length; i++) {
        let element = updateTaskBtn[i];
    
    
        // Add an event listener to each element
        element.addEventListener("click", updateTask);
    }

    if(tasks.length > 0) {
        clearBtn.style.opacity = 1;
    } else {
        clearBtn.style.opacity = 0;
    }
}