const LOCAL_KEY = 'todomvc';
// 获取目前所有的任务
export function fetch() {
  const result = localStorage.getItem(LOCAL_KEY);
  console.log(result)
  if (result != 'undefined' && result) {
    return JSON.parse(result);
  } else {
    return [];
  }
}
// 保存所有任务  "todos任务列表"
export function save(todos) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
}

// 生成任务的唯一编号
export function todoID() {
  return Date.now() + Math.random().toString(16).substr(2, 4)
}

// 筛选列表
export function todoFilter(todos, visibility = 'all') {
  if (visibility == 'all') {
    return todos;
  } else if (visibility == "active") {
    return todos.filter(ele => !ele.complete)
  } else if (visibility == "completed") {
    return todos.filter(ele => ele.complete)
  }
}