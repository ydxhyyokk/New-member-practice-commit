var tasklist = [{ text: '11' }, { text: '22' }];
var tasklistFinished = [];

/* Vue.component('newtask', {
    data: function() {
        return {
            tasklist: tasklist
        }
    },
    template: '<div class="task"><li> {{ task.text }} </li> <div onclick="deleteTask()" class="deleteButton"> × </div> </div>'
}); */

var toDoList = new Vue({
    data: {
        tasklist: tasklist,
        tasklistFinished: tasklistFinished
    },
    el: '#toDoList',
});

// <div class="task"> <li> 测试1 </li> <div onclick="deleteTask(测试1)" class="deleteButton"> × </div></div>'