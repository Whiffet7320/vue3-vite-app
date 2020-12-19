import { ref } from 'vue'
export function useRemoveTodo(todosRef) {
  const removeOne = (ele) => {
    todosRef.value.splice(todosRef.value.indexOf(ele), 1)
  };
  const removeUncomplele = () => {
    todosRef.value = todosRef.value.filter((item) => !item.complete)
  };
  return {
    removeOne,
    removeUncomplele,
  }
}