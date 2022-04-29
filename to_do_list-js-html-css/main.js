/*variables*/
let id = 1;
let task;
let done;
let button;

function addTask(){
    let inputTask = document.getElementById('inputTask');
    if (inputTask.value !== ''){
        //Creo los elementos dinamicamente con el metodo createElement
        task = document.createElement('div');
        done = document.createElement('input');
        button = document.createElement('input');
        let list = document.getElementById('list');
        //Agrego atributos al elemento creado
        let name = inputTask.value;
        task.innerText = `${id} ${name}`;
        task.setAttribute('id', id + inputTask.value);
        task.setAttribute('class', 'taskUnselected');
        //Agrego metodos para el comportamiento
        task.setAttribute('onmouseover', 'onMouseOver(this);');
        task.setAttribute('onmouseout', 'onMouseOut(this);');
        //Agrego el elemento creado a la lista
        list.appendChild(task);
        done.setAttribute('value', "Done");
        done.type = 'checkbox';
        done.setAttribute('class', 'control');
        task.appendChild(done);
        button.setAttribute('value', "Delete");
        button.type = 'button';
        button.setAttribute('class', 'control buttonDelete');
        button.setAttribute('onclick', 'onClick(this);');
        task.appendChild(button);
        id += 1;
    }
    else {
        alert('Debe ingresar un nombre para la tarea');
    }
}

/*Eventos*/

/*control es una referencia al control que llama al metodo*/
function onMouseOver(control){
    control.setAttribute('class', 'taskSelected');
}

function onMouseOut(control){
    control.setAttribute('class', 'taskUnselected');
}

function onClick(control){
    control.parentElement.remove();
}