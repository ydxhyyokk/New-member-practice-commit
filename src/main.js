
// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

//存取localStorage中的数据
var store = {
  save(key, value) { //存数据
      localStorage.setItem(key, JSON.stringify(value));
  },
  fetch(key) { //取数据
      return JSON.parse(localStorage.getItem(key)) || [];
  }
}

//所有的list
var list = store.fetch('vue-dotolist'); //fetch的key值可自定义

//过滤任务的三种状态
var filter = {
  all: function(list) {
      return list;
  },
  unfinished: function(list) {
      return list.filter(function(item) {
          return !item.isChecked;
      });
  },
  finished: function(list) {
      return list.filter(function(item) {
          return item.isChecked;
      });
  }
};
var vm = new Vue({
  el: '.main',
  data: {
      list: list,
      todo: '', //记录新增任务的数据
      editTodos: '', //记录正在编辑任务的数据
      beforTitle: '', //记录正在编辑的数据的原title
      visibility: 'all' //通过这个属性值的变化对数据筛选
  },
  watch: {
      //浅复制
      /*list: function(){ //监控list属性，当该值发生变化时调用函数
          store.save('vue-dotolist', this.list);
      }*/
      //深复制
      list: {
          handler: function() {
              store.save('vue-dotolist', this.list);
          },
          deep: true
      }
  },
  methods: {
      addTodo(e) { //添加任务
          //向list中添加一项任务
          //事件处理函数中的list指向的是当前根实例
          this.list.push({
              title: this.todo,
              isChecked: false //新增任务默认不勾选
          });
          this.todo = '';
      },
      deleteTodo(todo) { //删除任务
          var index = this.list.indexOf(todo); //找出在数组中的下标
          this.list.splice(index, 1);
      },
      editTodo(todo) { //编辑任务
          //   console.log(todo);
          //编辑任务时先记录这条任务的title,以便取消编辑时能保留之前的title
          this.beforTitle = todo.title;
          this.editTodos = todo;
      },
      edited(todo) { //编辑完成
          //按下enter键（keyCode为13）或者失去焦点完成编辑
          this.editTodos = '';
      },
      cancelEdit(todo) { //按下esc键取消编辑，保持原任务内容
          todo.title = this.beforTitle;
          this.beforTitle = '';
          //让div显示出来，input隐藏掉，也就是去掉li的class名editing
          this.editTodos = '';
      }
  },
  computed: { //计算属性
      noCheckedNum: function() { //计算未完成任务数
          return this.list.filter(function(item) { //筛选出isChecked为false的任务，即未完成
              return !item.isChecked
          }).length
      },
      filteredList: function() { //过滤任务状态
          //找到过滤函数就返回过滤后的数据，如果没有则返回所有函数
          return filter[this.visibility] ? filter[this.visibility](list) : list;
      }
  },
  directives: { //自定义事件，
      'myfocus': { //自定义事件名称
          update(el, binding) { //数据更新时
              //     console.log(binding);  //可查看到value属性值
              if (binding.value) { //如果value属性值为true执行获取焦点focus
                  el.focus();
              }
          }
      }
  }
});
// 监测hash改变，过滤任务
function watchHashChange() {
  var hash = window.location.hash.slice(1);
  vm.visibility = hash;
  console.log(hash)
}

//进入页面就执行函数
watchHashChange();
//hash改变时也执行函数
window.addEventListener('hashchange', watchHashChange);
