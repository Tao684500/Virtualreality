import React, { useState, useEffect } from "react";
import "../scss/todo-list.scss";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  const updateLocalStorage = (todos) => {
    const completedTodos = todos.filter(todo => todo.completed);
    localStorage.setItem("todos", JSON.stringify(completedTodos));
  };

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;

    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    updateLocalStorage(newTodos);
  };

  const editTodo = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };

  const saveEdit = (index) => {
    const newTodos = [...todos];
    newTodos[index].text = editingText;
    setTodos(newTodos);
    setEditingIndex(null);
    updateLocalStorage(newTodos);
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="เพิ่มงาน..."
        />
        <button onClick={addTodo}>เพิ่ม</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>บันทึก</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div>
                </div>
                <button 
                  onClick={() => editTodo(index)} 
                  disabled={todo.completed} 
                  className={todo.completed ? "edit-btn disabled" : "edit-btn"}
                >
                  แก้ไข
                </button>
              </>
            )}
            <button className="delete-btn" onClick={() => deleteTodo(index)}>
              ลบ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
