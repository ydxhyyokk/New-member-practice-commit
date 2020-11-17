let tasklist = [];
let tasklistFinished = [];

/* function SubmitTaskOld() {
    let task = document.getElementById("taskContent").value;
    let newElement = document.createElement("li");
    let todolist = document.getElementById("todo");
    if (task == "" || task == " ") {
        alert("输入不能为空")
    } else {
        newElement.innerText = task;
        todolist.appendChild(newElement);
    };
} */

// 这里Render函数需要create一整套div而不是单一个li
function Render() {
    let todolist = document.getElementById("todo");
    todolist.innerHTML = "";
    let finishedlist = document.getElementById("finished");
    finishedlist.innerHTML = "";
    for (let i in tasklist) {
        let newElement = document.createElement("div");
        newElement.className = "task";
        // console.log(tasklist[i]);
        newElement.innerHTML = "<li class='taskContent'>" + tasklist[i] + "</li> <div onclick=\"deleteTask(\'" + tasklist[i] + "\')\"" + "class='deleteButton'> × </div>" + "<div onclick=\"finishTask(\'" + tasklist[i] + "\')\"" + "class='finishButton'> √ </div>";
        todolist.appendChild(newElement); 
    };
    for (let i in tasklistFinished) {
        let newElement = document.createElement("div");
        newElement.className = "taskFinished";
        newElement.innerHTML = "<li class='taskContentf'>" + tasklistFinished[i] + "</li> <div onclick=\"deleteTaskf(\'" + tasklistFinished[i] + "\')\"" + "class='deleteButtonf'> × </div>";
        finishedlist.appendChild(newElement);
    };
}

function SubmitTask() {
    let task = document.getElementById("taskContent").value;
    // alert(task);
    if (task == "" || task == " ") {
        alert("输入不能为空");
    } else {
        tasklist.push(task);
        Render();
    };
    // alert(tasklist);
}

// 通过时间戳或字典系统来存储并识别每个列表元素；以便实现删除或其它功能

/* function saveDataOld() {
    let todolist = document.getElementById("todo");
    alert(todolist.innerHTML);
    localStorage.setItem("list", todolist.innerHTML);
}

function loadDataOld() {
    let list = localStorage.getItem("list");
    // alert(list);
    let todolist = document.getElementById("todo");
    todolist.innerHTML = list;
} */

function saveData() {
    localStorage.clear();
    localStorage.setItem("listLength", tasklist.length);
    localStorage.setItem("listLengthf", tasklistFinished.length);
    for (let i in tasklist) {
        localStorage.setItem("list_"+ String(i) , tasklist[i]);
    };
    for (let i in tasklistFinished) {
        localStorage.setItem("listf_"+ String(i) , tasklistFinished[i]);
    };
};

function loadData() {
    tasklist.splice(0, tasklist.length);
    tasklistFinished.splice(0, tasklistFinished.length);
    for (let i = 0; i < localStorage.getItem("listLength"); i++) {
        tasklist.push(localStorage.getItem("list_"+ String(i)));
    };
    for (let i = 0; i < localStorage.getItem("listLengthf"); i++) {
        tasklistFinished.push(localStorage.getItem("listf_"+ String(i)));
    };
    Render();
}

//依据元素值删除元素 inspired by: https://www.jb51.net/article/134312.htm
function deleteTask(taskName) {
    let index = tasklist.indexOf(taskName);
    if (index > -1) {
        tasklist.splice(index,1);
        // console.log(index);
        Render();
    } else {
        alert("任务名称错误");
        // console.log(index);
    };
};

function finishTask(taskName) {
    let index = tasklist.indexOf(taskName);
    if (index > -1) {
        tasklistFinished.push(tasklist[index]);
        tasklist.splice(index,1);
        Render();
    } else {
        alert("任务名称错误");
    };
};

function deleteTaskf(taskName) {
    let index = tasklistFinished.indexOf(taskName);
    if (index > -1) {
        tasklistFinished.splice(index,1);
        Render();
    } else {
        alert("任务名称错误");
    };
};

loadData()

//实时系统时间提取 inspired by:https://www.cnblogs.com/yidaixiaohui/p/7742746.html
function date(){
    let date = new Date();
    let week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let hour = date.getHours().toString();
    let minute = date.getMinutes().toString();
    let second = date.getSeconds().toString();
    let weekn = date.getDay().toString();
    document.getElementById("time").innerHTML = year + "/" + month + "/" + day + "</br>"  + week[weekn]  + "</br>" + hour + ":" + minute +":" + second;
}
date()
setInterval("date()",1000)