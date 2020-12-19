import { ref } from "vue";
import * as todoStorage from './todoStorage'

export function useNewTodo(newRef) {
  const newTodoRef = ref('');//新任务的标题
  const addTodo = () => {
    // 新增一个任务的方法
    const value = newTodoRef.value && newTodoRef.value.trim();
    if (!value) {
      return
    } else {
      // 生成任务对象，将其加入到任务列表中
      const todo = {
        title: value,
        complete: false,//任务是否完成
        id: todoStorage.todoID()
      }
      console.log('新增', todo)
      newRef.value.push(todo);
      newTodoRef.value = "";
    }
  }
  return {
    newTodoRef,
    addTodo
  }
}
