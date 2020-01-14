var vm = new Vue({
	el: "#app",
	data: {
		name: "Todolist",
		list: []
	},
	computed: {
		todoList: function(){
			var tl=[];
			for(var i=0;i<this.list.length;i++){
				if(!this.list[i].done)
					tl.push(this.list[i]);
			}
			return tl;
		},
		doneList: function(){
			var dl=[];
			for(var i=0;i<this.list.length;i++){
				if(this.list[i].done)
					dl.push(this.list[i]);
			}
			return dl;
		},
		storage: function(){
			return localStorage.getItem("todolistwithvuedata");
		}
	},
	methods: {
		allClear: function(){
			this.list=[];
		},
		addListItem: function(){
			box=document.getElementById("addTextBox");
			box.value=box.value.trim();
			if(box.value.length===0){
			    alert("Empty item");
			    return;
			}else if(box.value.length>=40) {
			    alert("Item should be under 40 characters");
			    return;
			}
			this.list.push({name: box.value, priority: 0, done: false});
			box.value="";
		},
		updateContent: function(item,itembox){
			alert("Editing function not available yet! Any changes made will NOT be saved!");
		},
		remove: function(item){
			for(var i=0;i<this.list.length;i++){
				if(this.list[i]==item){
					this.list.splice(i,1);
					return;
				}
			}
		}
	},
	created: function(){
		var history=localStorage.getItem("todolistwithvuedata");
		if(history!=null)
			this.list=JSON.parse(history);
	},
	watch:{
		list(newVal,oldVal){
			localStorage.setItem("todolistwithvuedata", JSON.stringify(newVal));
		}
	}
});

function sortByPriority(){
	return function(a,b){
		var value1 = a["priority"];
		var value2 = b["priority"];
		return value2 - value1;
	}
}

function sort(){
	vm.$data.list.sort(sortByPriority());
}
