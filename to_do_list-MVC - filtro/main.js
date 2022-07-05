/*variables*/
let id = 1;
let task;
let done;
let button;
let taskList;
let taskNumber;
let taskName;
let taskPriority;

//Modelo

//Clase tarea
class Task {
    constructor (id, name, priority) {
        this.id = id;
        this.name = name;
        this.priority = priority;
    }

    //Metodos get
    get getId () {
        return this.id;
    }

    get getName () {
        return this.name;
    }

    get getPriority(){
        return this.priority;
    }

    //Metodos set
    set setId (id) {
        this.id = id;
    }

    set setName (name) {
        this.name = name;
    }

    set setPriority(priority){
        this.priority = priority;
    }
}

//Clase lista de tareas
class TaskList {
    constructor () {
        this.taskList = [];
    }

    //Metodos set
    set setTaskList (taskList) {
        this.taskList = taskList;
    }

    //Metodos get
    get getTaskList () {
        return this.TaskList;
    }

    //Metodos

    //Agregar una tarea
    addTask (task) {
        this.taskList.push(task);
    }

    //Quita una tarea filtrando por id
    removeTask (id) {
        this.taskList = this.taskList.filter(item => item.id !== id);
    }
}

//Vista
/*function Render(taskList){
    let start = new Date(Date.now());
    let list = document.getElementById('list');
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
    taskList.taskList.forEach(element => {
        //Creo los elementos dinamicamente con el metodo createElement
        task = document.createElement('div');
        done = document.createElement('input');
        button = document.createElement('input');
        taskNumber = document.createElement('label');
        taskName = document.createElement('label');
        taskPriority = document.createElement('label');
        //Agrego atributos al elemento creado
        taskNumber.innerHTML = `Id: ${element.id} `;
        task.appendChild(taskNumber);
        taskName.setAttribute('id', `n${element.name} `);
        taskName.innerHTML = `Name: ${element.name}`;
        task.appendChild(taskName);
        taskPriority.innerHTML = `Priority: ${element.priority}`;
        task.appendChild(taskPriority);
        task.setAttribute('id', element.id);
        task.setAttribute('class', 'taskUnselected');
        //Agrego metodos para el comportamiento
        task.setAttribute('onmouseover', 'onMouseOverTask(this);');
        task.setAttribute('onmouseout', 'onMouseOutTask(this);');
        //Agrego el elemento creado a la lista
        list.appendChild(task);
        done.setAttribute('value', "Done");
        done.type = 'checkbox';
        done.setAttribute('class', 'control checkBoxDelete');
        task.appendChild(done);
        button.setAttribute('value', "Delete");
        button.type = 'button';
        button.setAttribute('class', 'control buttonDelete');
        button.setAttribute('onclick', 'onClickDelete(this);');
        task.appendChild(button);
    });
    let end = new Date(Date.now());
    let time = document.getElementById('time');
    time.value = (end.getMilliseconds() - start.getMilliseconds()) * 1000.0;
}*/

function Render(taskList) {
    let start = new Date(Date.now());
    let list = document.getElementById('list');
    //En el caso de filtrar el numero la cantidad de tareas es la misma
    if (list.childNodes.length === taskList.taskList.length) {
        while(list.firstChild) {
            list.removeChild(list.firstChild);
        }   
    }
    //Si hay mas nodos en la lista que dibujados agrego
    if (list.childNodes.length < taskList.taskList.length) {
        taskList.taskList.forEach(element => {
            let auxiliaryTask = document.getElementById(element.id);
            if (auxiliaryTask === null) {
                //Creo los elementos dinamicamente con el metodo createElement
                task = document.createElement('div');
                done = document.createElement('input');
                button = document.createElement('input');
                taskNumber = document.createElement('label');
                taskName = document.createElement('label');
                taskPriority = document.createElement('label');    
                //Agrego atributos al elemento creado
                taskNumber.innerHTML = `Id: ${element.id} `;
                task.appendChild(taskNumber);
                taskName.setAttribute('id', `n${element.name} `);
                taskName.innerHTML = `Name: ${element.name}`;
                task.appendChild(taskName);
                taskPriority.innerHTML = `Priority: ${element.priority}`;
                task.appendChild(taskPriority);
                task.setAttribute('id', element.id);
                task.setAttribute('class', 'taskUnselected');
                //Agrego metodos para el comportamiento
                task.setAttribute('onmouseover', 'onMouseOverTask(this);');
                task.setAttribute('onmouseout', 'onMouseOutTask(this);');
                //Agrego el elemento creado a la lista
                list.appendChild(task);
                done.setAttribute('value', "Done");
                done.type = 'checkbox';
                done.setAttribute('class', 'control checkBoxDelete');
                task.appendChild(done);
                button.setAttribute('value', "Delete");
                button.type = 'button';
                button.setAttribute('class', 'control buttonDelete');
                button.setAttribute('onclick', 'onClickDelete(this);');
                task.appendChild(button);
            }
        });
    }
    //Si hay menos nodos en la lista que dibujados elimino
    else {
        list.childNodes.forEach(item => {
            let taskDeleted = taskList.taskList.find(t => t.id === item.getAttribute('id'));
            if(taskDeleted === undefined){
                list.removeChild(item);
            }
        });
    }
    let end = new Date(Date.now());
    let time = document.getElementById('time');
    time.value = (end.getMilliseconds() - start.getMilliseconds()) * 1000;
}

/*Eventos*/

/*control es una referencia al control que llama al metodo*/


function onclickFilterTask(){
    Filter();
}

function onClickAscendingOrder(){
    taskList.taskList = taskList.taskList.sort(function(a, b) {
        return a.priority - b.priority;
    });
    Render(taskList);
}

function onClickDescendingOrder(){
    taskList.taskList = taskList.taskList.sort(function(a, b) {
        return b.priority - a.priority;
    });
    Render(taskList);
}

function onChangeText(){
    Filter();
}

function Filter(){
    let inputTask = document.getElementById('inputTaskFilter');
    if (inputTask.value !== ''){
        let auxiliaryTaskList = new TaskList();
        taskList.taskList.forEach(item => {
            if(item.getName.includes(inputTaskFilter.value)){
                auxiliaryTaskList.addTask(item);
            }
        });
        Render(auxiliaryTaskList);  
    }
    else{
        Render(taskList);
    }
}

function onMouseOverTask(control){
    control.setAttribute('class', 'taskSelected');
}

function onMouseOutTask(control){
    control.setAttribute('class', 'taskUnselected');
}

function onClickDelete(control) {
   if(control.previousSibling.checked) {
        let idControl = control.parentNode.getAttribute('id');
        taskList.removeTask(idControl);
        Render(taskList);
   }
   else {
        alert('La tarea no esta completa');
   }
}

//En el evento on load creo una lista vacia
function onLoadTodoList() {
    taskList = new TaskList();
}

//Evento para agregar una tarea
function onClickAdd() {
    let inputTask = document.getElementById('inputTask');
    let option = document.getElementById('selPriority');
    if (inputTask.value !== '' && option.value !== ''){
        task = new Task(id.toString(), inputTask.value, option.value);
        taskList.addTask(task);
        id += 1;
        inputTask.value = '';
        option.value = 1;
        Render(taskList);
    }
    else {
        alert('Debe ingresar un nombre y una prioridad para la tarea');
    }
}
