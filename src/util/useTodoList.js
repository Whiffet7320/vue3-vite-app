import { ref, watchEffect } from "vue";
import * as todoStorage from './todoStorage'

export function useTodoList() {
  const todosRef = ref(todoStorage.fetch());
  watchEffect(() => {//watchEffect用于监控数据变化
    todoStorage.save(todosRef.value)
  });
  return {
    todosRef,
  }
}