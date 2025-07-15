import React, { useState } from "react";
import {
  getLocalStorageTodoData,
  setLocalStorageTodoData,
} from "./TodoLocalStorage";

const Home = () => {
  const [tasks, setTasks] = useState(() => getLocalStorageTodoData());
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // todo add data to local storage
  setLocalStorageTodoData(tasks);

  // Add or Edit Task
  const addTask = () => {
    if (inputValue.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = inputValue;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: inputValue, completed: false }]);
    }

    setInputValue("");
  };

  // Edit Task
  const editTask = (key) => {
    if (tasks[key].completed) return;
    setInputValue(tasks[key].text);
    setEditIndex(key);
  };
  //  // Delete Task
  const deleteTask = (key) => {
    const updatedTasks = tasks.filter((_, i) => i !== key);
    setTasks(updatedTasks);
    // If the deleted task was being edited
    if (editIndex === key) {
      setEditIndex(null); // exit edit mode
      setInputValue(""); // clear input
    } else if (editIndex > key) {
      // Adjust editIndex if a task before it was deleted
      setEditIndex(editIndex - 1);
    }
  };

  // Toggle Checkbox
  const toggleCheckbox = (key) => {
    const updatedTasks = [...tasks];
    updatedTasks[key].completed = !updatedTasks[key].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-bold">My Tasks</h2>

      {/* Input Field */}
      <input
        type="text"
        placeholder="What do you need to do?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="p-3 border border-gray-300 rounded-md"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask(); 
          }
        }}
      />

      {/* Add Button */}
      <button
        onClick={addTask}
        className="bg-blue-500 hover:bg-blue-600  text-white px-4 py-2 rounded-md self-end"
      >
        {/* applied ternary operator on button if input of edit is not empty then show button with update task else add task */}
        {editIndex !== null ? "Update Task" : "Add Task"}
      </button>

      {/* Task List */}
      <ul className="">
        {tasks.map((task, key) => (
          <li
            key={key}
            className={`flex justify-between items-center p-4 rounded-md ${
              task.completed ? "!line-through" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCheckbox(key)}
                className="w-4 h-4"
              />
              <span>{task.text}</span>
            </div>
            <div className="space-x-2.5">
              <button
                onClick={() => editTask(key)}
                className="hover:bg-yellow-300"
              >
                ✏️
              </button>
              <button
                onClick={() => deleteTask(key)}
                className="hover:bg-red-400"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
