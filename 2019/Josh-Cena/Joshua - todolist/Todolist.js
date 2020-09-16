//Add new item (called in the main function)
function addListItem(e) {
    var item = {name: "",done: false};
    document.getElementById("addTextBox").value = document.getElementById("addTextBox").value.trim();
    if (document.getElementById("addTextBox").value.length === 0){
        alert("Empty item");
        return;
    }
    item.name = document.getElementById("addTextBox").value;
    todolist.push(item);
    saveData(todolist);
    document.getElementById("addTextBox").value = "";
    load();
    document.getElementById("addTextBox").focus();
}

//Save data to the native file
function saveData(data) {
    localStorage.setItem("todolistdata", JSON.stringify(data));
}

//Update the list according to the history loaded
function load(){
    var todoString = "", doneString = "",
        todoCount = 0, doneCount = 0;
    document.getElementById("addTextBox").focus();
    todolist = loadData();
    if (todolist != null){
        for (var i=0; i<todolist.length; i++){
            if(!todolist[i].done){
                todoString += "<li><input type='checkbox' onchange='updateStatus("+i+")'>"
                    + "<p id='p-"+i+"' onclick='editText("+i+")'>"+todolist[i]["name"]+"</p>"
                    + "<a onclick='remove("+i+")'>×</a></li>";
                todoCount++;
            }else{
                doneString += "<li><input type='checkbox' onchange='updateStatus("+i+")' checked>"
                    + "<p id='p-"+i+"' onclick='editText("+i+")'>"+todolist[i]["name"]+"</p>"
                    + "<a onclick='remove("+i+")'>×</a></li>";
                doneCount++;
            }
        }
        document.getElementById("todolist").innerHTML = todoString;
        document.getElementById("donelist").innerHTML = doneString;
        document.getElementById("todocount").innerHTML = todoCount;
        document.getElementById("donecount").innerHTML = doneCount;
    }else {
        document.getElementById("todolist").innerHTML = "";
        document.getElementById("donelist").innerHTML = "";
        document.getElementById("todocount").innerHTML = 0;
        document.getElementById("donecount").innerHTML = 0;
    }
}

function editText(i) {
    var itembox = document.getElementById('p-'+i),
        prevContent = itembox.innerHTML,
        inputBox;
    function validateAndUpdate() {
        if (inputBox.value.length === 0) {
            itembox.innerHTML = prevContent;
            alert("Empty item");
        }else {
            update(i, "name", inputBox.value);
        }
    }
    itembox.innerHTML = "<input type='text' id='input-"+i+"' value='"+prevContent+"'>";
    inputBox = document.getElementById('input-'+i);
    inputBox.focus();
    inputBox.setSelectionRange(0, inputBox.value.length);
    inputBox.onblur = validateAndUpdate;
    inputBox.onkeypress = function (e) {
                              if (e.keyCode == 13)
                                  validateAndUpdate();
                          };
}

function update(i, field, value) {
    todolist[i][field] = value;
    saveData(todolist);
    load();
}

function remove(i) {
    todolist.splice(i,1);
    saveData(todolist);
    load();
}

function updateStatus(i){
    if(todolist[i]["done"]){
        update(i,"done",false);
    }else{
        update(i,"done",true);
    }
}

//Load data from the native file (if it exists)
function loadData() {
    var history = localStorage.getItem("todolistdata");
    if(history != null){
        return JSON.parse(history);
    }else {
        return [];
    }
}

function allClear() {
    localStorage.clear();
    load();
}

function test(){
    alert("Click");
}

window.addEventListener("load", load);
document.getElementById("clearbutton").onclick = allClear;
document.getElementById("addTextBox").onkeypress = function (event) {
                                                       if(event.keyCode === 13)
                                                            addListItem();
                                                   };