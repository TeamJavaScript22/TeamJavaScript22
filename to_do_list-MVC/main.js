/*variables*/
let id = 1;
let task;
let done;
let button;
let taskList;

//Modelo

//Clase tarea
class Task {
    constructor (id, name) {
        this.id = id;
        this.name = name;
    }

    //Metodos get
    get getId () {
        return this.id;
    }

    get getName () {
        return this.name;
    }

    //Metodos set
    set setId (id) {
        this.id = id;
    }

    set setName (name) {
        this.name = name;
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
function render(taskList){
    let list = document.getElementById('list');
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
    taskList.taskList.forEach(element => {
        //Creo los elementos dinamicamente con el metodo createElement
        task = document.createElement('div');
        done = document.createElement('input');
        button = document.createElement('input');
        //Agrego atributos al elemento creado
        task.innerText = `${element.name}`;
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
}

/*Eventos*/

/*control es una referencia al control que llama al metodo*/
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
        render(taskList);
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
    if (inputTask.value !== ''){
        task = new Task(id + inputTask.value, inputTask.value);
        taskList.addTask(task);
        id += 1;
        render(taskList);  
    }
    else {
        alert('Debe ingresar un nombre para la tarea');
    }
}

