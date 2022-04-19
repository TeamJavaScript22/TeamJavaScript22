/*var*/



/*functions*/

function Add_task(){
    let input = document.getElementById('txt_task');
    let list = document.getElementById('lst_task');
    let li = document.createElement('li');
    li.innerText = input.value;
    li.setAttribute('id', input.value);
    list.appendChild(li);
}

function Delete_task(){
    let input = document.getElementById('txt_task');
    let list = document.getElementById('lst_task');
    let selected_item = document.getElementById(input.value);
    list.removeChild(selected_item);
}