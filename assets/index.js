document.querySelector("form").addEventListener('submit', handleSubmit);
document.querySelector(".btn_clear").addEventListener('click', clear);


let task_list = localStorage.length > 0 ? JSON.parse(localStorage.getItem('task_list')) : []; // ternary operator - very nice thing with condition on daclaration.

render();
function handleSubmit(event){
    event.preventDefault();
    const task = getFormData(event.target);
    //event.target.reset();
    tasklistUpdate(task);
    updateLocalStorage();
    render();
}

function getFormData(data){
    const task= {};
    const formData = new FormData(data);
    for (const [key, value] of formData) {
        task[key] = value;
    }
    return task;
}

function tasklistUpdate(task = undefined){
    
    let i =0;
    for(;i<task_list.length;i++){
        task_list[i].id = i; // set id to each task obj  
    }
    // on new task event only (wont run on remove task)
    if(task){
        task.id = i;
        task_list.unshift(task);
    }

}

function updateLocalStorage(){
    localStorage.setItem('task_list',JSON.stringify(task_list))
}

function render(){
    document.querySelector('.root').innerHTML = "";

    for(let i = 0; i<task_list.length; i++){ 
        const node = document.createElement("div");
        node.classList.add("col-sm-4");
        
        if(i == 0) {node.classList.add("fade_in");
            node.innerHTML = innerHTMLcreator(task_list[i]);
            document.querySelector('.root').appendChild(node);
        } else {
            setTimeout(()=>{
                node.innerHTML = innerHTMLcreator(task_list[i]);
                document.querySelector('.root').appendChild(node);
            },800)
        }
    }   

}

function innerHTMLcreator(task){
    let listPointer = '*';
    let content = `
    <div class="card" id="${task.id}">   
        <img src="assets/img/notebg.png" alt="" height="420" width="400">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-circle-fill" onclick=(removeTask(this.parentElement)) viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
        </svg>
        <h1 class="card_header">${task.task_header}</h1>
        <ul class="card_list">
            <li >${task.task_1 ? listPointer : ''} ${task.task_1}</li>
            <li >${task.task_2 ? listPointer : ''} ${task.task_2}</li>
            <li >${task.task_3 ? listPointer : ''} ${task.task_3}</li>
        </ul>
        <h3 class="card_date">${task.date} ${task.time}</h3>
    </div>
    `
    return content;
}

function clear(){
    localStorage.clear();
    task_list.length = 0;
    render()
}

function removeTask(el){
    const index = el.getAttribute("id")
    task_list.splice(index,1);
    
    tasklistUpdate();
    updateLocalStorage();
    render();

}

function setSubmissionStatus(el){
    console.log(el)
}