var app = new Vue({
    el: '#app',
    data: {
        todos: [],
        ntodo: {
            name: "",
            ddl: "",
            finished: "Unfinished"
        }
    },
    methods: {
        add: function() {
            this.todos.push(this.ntodo);
            this.ntodo = {
                name: "",
                ddl: "",
                finished: "Unfinished"
            };
        },
        change: function(i) {
            if (this.todos[i].finished == "Finished")
                this.todos[i].finished = "Unfinished";
            else
                this.todos[i].finished = "Finished";
        },
        deleted: function(i) {
            this.todos.splice(i, 1);
        },
        loadComments() {
            var list = localStorage.getItem("todos");
            this.todos = list;
        }
    },
    created: function() {
        var tmp = JSON.parse(localStorage.getItem('todos'));
        if (tmp != null) {
            this.todos = tmp;
        }
        add();
    },
    updated: function() {
        console.log("updated!");
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
})