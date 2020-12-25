var tasklist = [{ text: '11', id:0 }, { text: '22', id:1 }];
var tasklistFinished = [];

var toDoList = new Vue({
    data: {
        tasklist: tasklist,
        tasklistFinished: tasklistFinished
    },
    el: '#toDoList',
});

function SubmitTask() {
    let task = document.getElementById("taskContent").value;
    // alert(task);
    if (task == "" || task == " ") {
        alert("输入不能为空");
    } else {
        // 获取时间戳 inspired by: https://www.cnblogs.com/fozero/p/6959946.html
        timeStamp = (new Date()).valueOf();
        taskObj = { text: task, id: timeStamp };
        tasklist.push(taskObj);
    };
};

// 通过时间戳或字典系统来存储并识别每个列表元素；以便实现删除或其它功能

function saveArray() {
    localStorage.clear();
    list = JSON.stringify(tasklist);
    listf = JSON.stringify(tasklistFinished);
    localStorage.setItem("listLength", (tasklist.length));
    localStorage.setItem("listLengthf", (tasklistFinished.length));
    localStorage.setItem("tasklistLocal", list);
    localStorage.setItem("tasklistFinishedLocal", listf);
};

function loadArray() {
    tasklist.splice(0, (tasklist.length));
    tasklistFinished.splice(0, (tasklistFinished.length));
    list = localStorage.getItem("tasklistLocal");
    listf = localStorage.getItem("tasklistFinishedLocal");
    let a = JSON.parse(list);
    let b = JSON.parse(listf);
    for (let i = 0; i < localStorage.getItem("listLength"); i++) {
        tasklist.push(a[i]);
    };
    for (let i = 0; i < localStorage.getItem("listLengthf"); i++) {
        tasklistFinished.push(b[i]);
    };
};

//依据元素值删除元素 inspired by: https://www.jb51.net/article/134312.htm
function deleteTask(taskId) {
    let targetObj = tasklist.find(obj => (obj.id == taskId));
    // 箭头函数 设变量obj为数组项，如obj.id等于taskId，返回ture
    // find方法返回首个为ture的数组项的index
    let index = tasklist.indexOf(targetObj);
    if (index > -1) {
        tasklist.splice(index, 1);
        // console.log(index);
    } else {
        alert("任务名称错误");
        // console.log(index);
    };
    saveArray();
};

function finishTask(taskId) {
    let targetObj = tasklist.find(obj => obj.id == taskId);
    let index = tasklist.indexOf(targetObj);
    if (index > -1) {
        tasklistFinished.push(tasklist[index]);
        tasklist.splice(index, 1);
    } else {
        alert("任务名称错误");
    };
    saveArray();
};

function deleteTaskf(taskId) {
    let targetObj = tasklistFinished.find(obj => obj.id == taskId);
    let index = tasklistFinished.indexOf(targetObj);
    if (index > -1) {
        tasklistFinished.splice(index, 1);
    } else {
        alert("任务名称错误");
    };
    saveArray();
};

function definishTask(taskId) {
    let targetObj = tasklistFinished.find(obj => obj.id == taskId);
    let index = tasklistFinished.indexOf(targetObj);
    if (index > -1) {
        tasklist.push(tasklist[index]);
        tasklistFinished.splice(index, 1);
    } else {
        alert("任务名称错误");
    };
    saveArray();
};

loadArray();

function date() {
    let date = new Date();
    let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let hour = date.getHours().toString();
    let minute = date.getMinutes().toString();
    let second = date.getSeconds().toString();
    let weekn = date.getDay().toString();
    document.getElementById("time").innerHTML = year + "年" + month + "月" + day + "日</br>" + week[weekn] + "</br>" + hour + ":" + minute + ":" + second;
};
date();
setInterval("date()", 1000);

function toDonation() {
    location.href = "donation.html";
};