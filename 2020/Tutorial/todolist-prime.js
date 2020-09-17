// Source: https://blog.csdn.net/z_cas/article/details/78714289
function addTodolist(e) {
  var obj_list = {
    todo: "",
    done: false
  };
  document.getElementById("add_list").value = document.getElementById("add_list").value.trim();
  if(document.getElementById("add_list").value.length === 0){
    alert("Item can't be empty!");
    return;
  }
  obj_list.todo = document.getElementById("add_list").value;
  todolist.push(obj_list);
 
  saveData(todolist);
 
  document.getElementById("add_list").value = "";
  load();
  document.getElementById("add_list").focus();
}

function load(){
  var todo = document.getElementById("todolist"),
    done = document.getElementById("donelist"),
    todocount = document.getElementById("todocount"),
    donecount = document.getElementById("donecount"),
    todoString = "",
    doneString = "",
    todoCount = 0,
    doneCount = 0;
  document.getElementById("add_list").focus();

  todolist = loadData();

  if(todolist != null){
    for(var i = 0; i < todolist.length; i++){
      if(!todolist[i].done){
        todoString += "<li>"
          + "<input type='checkbox' οnchange='update("+i+", \"done\", true)'>"
          + "<p id='p-"+i+"' οnclick='edit("+i+")'>" + todolist[i].todo + "</p>"
          + "<a οnclick='remove("+i+")'>-</a>"
          + "</li>";
        todoCount++;
      }else{
        doneString += "<li>"
          + "<input type='checkbox' "
          + "οnchange='update("+i+", \"done\", false)' checked>"
          + "<p id='p-"+i+"' οnclick='edit("+i+")'>" + todolist[i].todo + "</p>"
          + "<a οnclick='remove("+i+")'>-</a>"
          + "</li>";
        doneCount++;
      }
    }
    todo.innerHTML = todoString;
    done.innerHTML = doneString;
    todocount.innerHTML = todoCount;
    donecount.innerHTML = doneCount;
  }else{
    todo.innerHTML = "";
    done.innerHTML = "";
    todocount.innerHTML = 0;
    donecount.innerHTML = 0;
  }
}

function edit(i) {
  var p = document.getElementById('p-' + i),
    pContent = p.innerHTML,
    inputId;
  function confirm() {
    if(inputId.value.length === 0) {
      p.innerHTML = pContent;
      alert("Item can't be empty!");
    }else{
      update(i, "todo", inputId.value);
    }
  }
  function enter(e) {
    if(e.keyCode == 13){
      confirm();
    }
  }
  p.innerHTML = "<input type='text' id='input-"+i+"' value='"+pContent+"'>";
  inputId = document.getElementById('input-'+i);
  inputId.focus();
  inputId.setSelectionRange(0, inputId.value.length);
  inputId.onblur = confirm;
  inputId.onkeypress = enter;
}

function update(i, field, value) {
  todolist[i][field] = value;
  saveData(todolist);
  load();
}

function remove(i) {
  todolist.splice(i, 1);
  saveData(todolist);
  load();
}

function saveData(data) {
  localStorage.setItem("mytodolist", JSON.stringify(data));
}

function loadData() {
  var hisTory = localStorage.getItem("mytodolist");
  if(hisTory != null){
      return JSON.parse(hisTory);
  }else{
    return [];
  }
}

function clear() {
  localStorage.clear();
  load();
}

window.addEventListener("load", load);
document.getElementById("clearbutton").onclick = clear;
document.getElementById("add_list").onkeypress = function (event) {
    if(event.keyCode === 13){
        addTodolist();
    }
};
