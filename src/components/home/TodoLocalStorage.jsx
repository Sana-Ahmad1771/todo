const todoKey= "todoReact";
export const getLocalStorageTodoData =() =>{
const rawTodos= localStorage.getItem(todoKey);
    if(!rawTodos) return[];
    return JSON.parse(rawTodos);
}
export const setLocalStorageTodoData =(tasks) =>{
return localStorage.setItem(todoKey, JSON.stringify(tasks));
}
