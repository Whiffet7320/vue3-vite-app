import { ref,computed } from 'vue'
export function useEditTodo(todosRef){
  const editingTodo = ref(null);//当前正在修改的是哪一个todo
  const dbEditTodo = (ele)=>{
    editingTodo.value = ele
  }
  const enterEditTodo = (ele)=>{
    editingTodo.value = null
    if(ele.title && ele.title.trim()){
      ele.title = ele.title.trim()
    }else{
      // 删除
      const index = todosRef.value.indexOf(ele);
      if (index >= 0) {
        todosRef.value.splice(index, 1);
      }
      // todosRef.value.splice(todosRef.value.indexOf(ele),1)
    }
  }
  const allTodoCompleteRef = computed({
    get(){
      //未完成的列表数目为0（全部已完成【全部勾选】）
      return todosRef.value.filter(item=>!item.complete).length === 0 && todosRef.value.length>0
    },
    set(checked){
      todosRef.value.forEach(my_ele=>{
        my_ele.complete = checked
      })
    }
  })
  return{
    editingTodo,
    dbEditTodo,
    enterEditTodo,
    allTodoCompleteRef,
  }
}