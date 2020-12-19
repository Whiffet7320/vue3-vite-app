<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          @keyup.enter="addTodo"
          v-model="newTodoRef"
        />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allTodoCompleteRef"/>
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li class="todo" v-for="ele in myFilterRef" :key="ele.id" :class="{completed:ele.complete,editing:ele === editingTodo}">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="ele.complete"/>
              <label @dblclick="dbEditTodo(ele)">{{ele.title}}</label>
              <button class="destroy" @click="removeOne(ele)"></button>
            </div>
            <input @blur="enterEditTodo(ele)" @keyup.enter="enterEditTodo(ele)" class="edit" type="text" v-model="ele.title"/>
          </li>
          <!-- <li class="todo">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>投递50封简历</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li>
          <li class="todo">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>上午10:30 参加面试</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li> -->
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>{{isCompelet}}</strong>
          <span>条未完成</span>
        </span>
        <ul class="filters">
          <li><a href="#/all" :class="{selected:visibilityRef==='all'}">All</a></li>
          <li><a href="#/active" :class="{selected:visibilityRef==='active'}">Active</a></li>
          <li><a href="#/completed" :class="{selected:visibilityRef==='completed'}">Completed</a></li>
        </ul>
        <button v-show="clearComplete" @click="removeUncomplele" class="clear-completed">
          清空已完成
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import {useTodoList} from './util/useTodoList'
import {useNewTodo} from './util/useNewTodo'
import {useFilter} from './util/useFilter'
import {useEditTodo} from './util/useEditTodo'
import {useRemoveTodo} from './util/useRemoveTodo'
export default {
  setup() {
    const {todosRef} = useTodoList();//获取到结构后的返回值(获取目前所有的任务)
    return{
      ...useNewTodo(todosRef),
      ...useFilter(todosRef),
      ...useEditTodo(todosRef),
      ...useRemoveTodo(todosRef)
    }
  },
};
</script>
