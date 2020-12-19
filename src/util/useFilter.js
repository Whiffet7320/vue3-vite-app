import { ref, onMounted, onUnmounted, computed } from 'vue';
import { todoFilter } from './todoStorage'
const hashList = ["all", "active", "completed"]
export function useFilter(todosRef) {
  const visibilityRef = ref('all');
  const onHashChange = () => {
    const hash = location.hash.replace(/#\/?/, "");
    if (hashList.includes(hash)) {
      // hash有效
      visibilityRef.value = hash;
    } else {
      // hash无效
      location.hash = "";
      visibilityRef.value = "all";
    }
  }
  // 组件挂载完成的生命周期函数
  onMounted(() => {
    window.addEventListener('hashchange', onHashChange)
  });
  // 组件销毁后的生命周期函数
  onUnmounted(() => {
    window.removeEventListener('hashchange', onHashChange)
  });
  // 计算属性
  const myFilterRef = computed(() => {
    return todoFilter(todosRef.value, visibilityRef.value)
  });
  const isCompelet = computed(() => { // 还有几条数据未完成
    return todosRef.value.filter(ele => !ele.complete).length;
  })
  const clearComplete = computed(() => {  // 觉得是否要显示清空列表按钮
    return todoFilter(todosRef.value, 'completed').length > 0
  })
  return {
    visibilityRef,
    myFilterRef,
    isCompelet,
    clearComplete
  }
}