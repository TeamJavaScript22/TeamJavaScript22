/*variables*/
let id = 1;
let task;
let done;
let button;
let taskToDoList;
let taskNumber;
let taskName;
let taskPriority;
let taskInProgres;
let taskDone;

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

//Se modifico para poder adaptarlo a tres listas
function Render(toDoList, inProgresList, doneList) {
    /*let start es la variable que guarda el
    momento en el que inicia el metodo, sirve
    para despues calcular el tiempo que demora
    el metodo*/
    let start = new Date(Date.now());
    let toDo = document.getElementById('toDoList');
    let inProgres = document.getElementById('inProgres');
    let done = document.getElementById('done');
    /*El metodo drawList se encarga de dibujar
    la lista y se llama para cada lista*/
    drawList(toDoList, toDo);
    drawList(inProgresList, inProgres);
    drawList(doneList, done);
    /*let end guarda el momento en que termina
    de dibujar*/
    let end = new Date(Date.now());
    let time = document.getElementById('time');
    /*calcula el tiempo que demora en dibujar las filas*/
    time.value = (end.getMilliseconds() - start.getMilliseconds()) * 1000;
}

/*drawList es un metodo generico para dibujar listas*/
function drawList(taskList, list){
    let count = 0;
    /*Caso en que la lista del DOM es igual a la lista del modelo*/
    if (list.childNodes.length === taskList.taskList.length) {
        while(list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }
    //Caso en que hay mas elementos en la lista del DOM que en la lista del modelo*/
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
                taskNumber.setAttribute('class', 'label');
                task.appendChild(taskNumber);
                taskName.setAttribute('id', `n${element.name} `);
                taskName.setAttribute('class', `label`);
                taskName.innerHTML = `${element.name}`;
                task.appendChild(taskName);
                taskPriority.innerHTML = `${element.priority}`;
                taskPriority.setAttribute('class', `label`);
                taskName.setAttribute('id', `n${element.name} `);
                task.appendChild(taskPriority);
                task.setAttribute('id', element.id);
                task.setAttribute('class', 'taskUnselected');
                task.setAttribute('draggable', 'true');
                //Agrego metodos para el comportamiento
                task.setAttribute('onmouseover', 'onMouseOverTask(this);');
                task.setAttribute('onmouseout', 'onMouseOutTask(this);');
                /*Agrego el evento ondragstart*/
                task.setAttribute('ondragstart', 'onDragStart(event);');
                /*Agrego el elemento ondragend*/
                task.setAttribute('ondragend', 'onDragEnd(event);');
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
    //Si hay menos elementos en la lista que dibujados elimino
    else {
        let auxiliaryChildsList = Array.from(list.childNodes);
        auxiliaryChildsList.forEach(item => {
            let taskDeleted = taskList.taskList.find(t => t.id === item.getAttribute('id'));
            if(taskDeleted === undefined){
                list.removeChild(item);
            }
            count = count + 1;
            console.log(auxiliaryChildsList.length);
        });
    }
}

/*Eventos*/

/*control es una referencia al control que llama al metodo*/

//Evento para filtrar tareas en base a un string
function onclickFilterTask(){
    Filter();
}

//Metodo para ordenar de manera acendente por prioridad
function onClickAscendingOrder(){
    taskToDoList.taskList = taskToDoList.taskList.sort(function(a, b) {
        return a.priority - b.priority;
    });
    taskInProgres.taskList = taskInProgres.taskList.sort(function(a, b) {
        return a.priority - b.priority;
    });
    taskDone.taskList = taskDone.taskList.sort(function(a, b) {
        return a.priority - b.priority;
    });
    Render(taskToDoList, taskInProgres, taskDone);
}

//Metodo para ordenar de manera decendente por prioridad
function onClickDescendingOrder(){
    taskToDoList.taskList = taskToDoList.taskList.sort(function(a, b) {
        return b.priority - a.priority;
    });
    taskInProgres.taskList = taskInProgres.taskList.sort(function(a, b) {
        return b.priority - a.priority;
    });
    taskDone.taskList = taskDone.taskList.sort(function(a, b) {
        return b.priority - a.priority;
    });
    Render(taskToDoList, taskInProgres, taskDone);
}

//Evento que permite filtrar cuando el input text se borra
function onChangeText(){
    Filter();
}

//Metodo para filtrar
function Filter(){
    let inputTask = document.getElementById('inputTaskFilter');
    //Listas auxiliares
    let auxiliaryToDoTaskList = new TaskList();
    let auxiliaryInProgresTaskList = new TaskList();
    let auxiliaryDoneTaskList = new TaskList();
    if (inputTask.value !== ''){
        taskToDoList.taskList.forEach(item => {
            if(item.getName.includes(inputTaskFilter.value)){
                auxiliaryToDoTaskList.addTask(item);
            }
        });
        taskInProgres.taskList.forEach(item => {
            if(item.getName.includes(inputTaskFilter.value)){
                auxiliaryInProgresTaskList.addTask(item);
            }
        });
        taskDone.taskList.forEach(item => {
            if(item.getName.includes(inputTaskFilter.value)){
                auxiliaryDoneTaskList.addTask(item);
            }
        });
        Render(auxiliaryToDoTaskList, auxiliaryInProgresTaskList, auxiliaryDoneTaskList);  
    }
    else{
        Render(taskToDoList, taskInProgres, taskDone);
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
        taskToDoList.removeTask(idControl);
        taskInProgres.removeTask(idControl);
        taskDone.removeTask(idControl);
        Render(taskToDoList, taskInProgres, taskDone);
   }
   else {
        alert('La tarea no esta completa');
   }
}

//Evento que se dispara cuando empiezo a arrastrar el elemento
function onDragStart(event){
    event.dataTransfer.setData('text/plain', event.target.id + "-" + event.target.childNodes[1].innerHTML + "-" + event.target.childNodes[2].innerHTML);
    taskToDoList.removeTask(event.target.id);
    taskInProgres.removeTask(event.target.id);
    taskDone.removeTask(event.target.id);
}

//En el evento on load creo una lista vacia
function onLoadTodoList() {
    taskToDoList = new TaskList();
    taskInProgres = new TaskList();
    taskDone = new TaskList();
}

//Evento para agregar una tarea
function onClickAdd() {
    let inputTask = document.getElementById('inputTask');
    let option = document.getElementById('selPriority');
    if (inputTask.value !== '' && option.value !== ''){
        task = new Task(id.toString(), inputTask.value, option.value);
        taskToDoList.addTask(task);
        id += 1;
        inputTask.value = '';
        option.value = 1;
        Render(taskToDoList, taskInProgres, taskDone);
    }
    else {
        alert('Debe ingresar un nombre y una prioridad para la tarea');
    }
}

/*Evento que se dispara cuando suelto el elemento en un contenedor
en este caso una lista*/
function onDropToDoList(event){
    event.preventDefault();
    let json = event.dataTransfer.getData('text');
    let data = json.split('-');
    let name = data[1];
    let p = data[2];
    let idTask = data[0];
    task = new Task(idTask, name, p);
    taskToDoList.addTask(task);
    Render(taskToDoList, taskInProgres, taskDone);
}

//El mismo evento pero para otra lista
function onDropInProgresList(event){
    event.preventDefault();
    let json = event.dataTransfer.getData('text');
    let data = json.split('-');
    let name = data[1];
    let p = data[2];
    let idTask = data[0];
    task = new Task(idTask, name, p);
    taskInProgres.addTask(task);
    Render(taskToDoList, taskInProgres, taskDone);
}

function onDropDoneList(event){
    event.preventDefault();
    let json = event.dataTransfer.getData('text');
    let data = json.split('-');
    let name = data[1];
    let p = data[2];
    let idTask = data[0];
    task = new Task(idTask, name, p);
    taskDone.addTask(task); 
    Render(taskToDoList, taskInProgres, taskDone);
}

//Evento que se dispara cuando se terina de arrastrar un elemento
function onDragEnd(event){
    
}

/*Evento que se dispara cuando el elemnto que esta siendo arrastrado
pasa sobre otro elemento*/
function onDropOver(event){
    /*Previene el comportamiento por defecto cuando un elemento pasa sobre otro*/
    event.preventDefault();
}

function onDropBody(event){
    
}