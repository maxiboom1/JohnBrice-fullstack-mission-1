document.querySelector("form").addEventListener('submit', handleSubmit);
document.querySelector(".btn_clear").addEventListener('click', clear);


let task_list = localStorage.length > 0 ? JSON.parse(localStorage.getItem('task_list')) : []; // ternary operator - very nice thing with condition on daclaration.

function handleSubmit(event){
    event.preventDefault();
    const task = getFormData(event.target);
    //event.target.reset();
    updateLocalStorage();
    tasklistUpdate(task);
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

function tasklistUpdate(task){
    task_list.push(task);
}

function updateLocalStorage(){
    localStorage.setItem('task_list',JSON.stringify(task_list))
}

function render(){
    document.querySelector('.root').innerHTML = "";

    for(let i = 0; i<task_list.length; i++){ 
        const node = document.createElement("div");
        node.classList.add("col-sm-4");
        node.innerHTML = innerHTMLcreator(task_list[i]);
        document.querySelector('.root').appendChild(node);
    }   

}

function innerHTMLcreator(task){
    console.log(task)
    let content = `
    <div class="card">   
        <img src="assets/img/notebg.png" alt="" height="420" width="400">
        <h3 class="card_header">${task.task_header}</h3>
        <ul class="card_list">
            <li><input type="checkbox">${task.task_1}</li>
            <li><input type="checkbox">${task.task_2}</li>
            <li><input type="checkbox">${task.task_3}</li>
        </ul>
        <h5 class="card_date">${task.date} ${task.time}</h5>
    </div>
    `
    return content;
}

function clear(){
    localStorage.clear();
    task_list.length = 0;
    render()
}