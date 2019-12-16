var vm = new Vue(
    {
    el: '#sth',    
    data: 
    {
        ToDoList : [],      //list of items
        ToDoThing : '',     //input
        DoneNum : 0,        //number of todo items
        TodoNum : 0,        //number of done items
        TodoSent : 'You dont have anything to do! Enjoy!',
        DoneSent : 'Nothing is done. Work hard!',
        todos : '',         //any "s" after thing?
        dones : ''          
    },
    methods: 
    {
        Calsent: function(){
        //to derive the sentence outputs
            if (this.TodoNum <= 1)
            {
                this.todos = '';
            }
            else
            {
                this.todos = 's';
            }
            if (this.DoneNum <= 1)
            {
                this.dones = '';
            }
            else
            {
                this.dones = 's';
            }
            if (this.TodoNum <= 0)
            {
                this.TodoSent = "You don't have anything to do! Enjoy!";
            }
            else
            {
                this.TodoSent = 'You have ' + this.TodoNum + " thing" + this.todos + " todo.";
            }
            if (this.DoneNum <= 0)
            {
                this.DoneSent = 'Nothing is done. Work hard!';
            }
            else
            {
                this.DoneSent = 'You have done ' + this.DoneNum + " thing" + this.dones + ". Keep going!";
            }
        },
        AppendToDo: function()
        //append a todo item
        {
            if (this.ToDoThing === '')
            //warning for not entering things
            {
                alert("Please write something!");
                return;
            }
            else
            {
                this.TodoNum += 1;
                this.Calsent();
                this.ToDoList.push({
                    content : this.ToDoThing,
                    IsDone : false
                });
                this.ToDoThing = '';
                this.$refs.content.focus();
            }
        },

        DeleteToDo: function(item)
        //delete a todo item
        {
            this.TodoNum -= 1;
            this.Calsent();
            var index = this.ToDoList.indexOf(item);
            this.ToDoList.splice(index, 1);
            this.$refs.content.focus();
        },

        ClearAll: function()
        //clear the todo list
        {
            this.ToDoList = [];
            this.DoneNum = 0;
            this.TodoNum = 0;
            this.Calsent();
            this.$refs.content.focus();
        },

        ChangeState: function(item)
        //determine if the item is done or not
        {
            item.IsDone = 1 - item.IsDone;
            this.DoneNum += item.IsDone * 2 - 1
            this.TodoNum -= 1;
            this.Calsent();
            this.$refs.content.focus();
        }
    }
});

