import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function generateUniqueId() {
  return Math.floor(Math.random() * 100000);
}
const AddTodo = () => {

  const todo_title ={
    width: "50vw",
  }
  const todo_desc = {
    width: "70px",
    height: 20
  }



  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const saveTodoToLocalStorage = (todo) => {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate) {
      alert("All the fields are compulsory")
    }
    else {
      const newTodo = {
        id: generateUniqueId(),
        title,
        description,
        dueDate
      };
      saveTodoToLocalStorage(newTodo);
      // Save the new todo item to local storage
      // Clear the form
      setTitle("");
      setDescription("");
      setDueDate("");
      alert("To-do saved succesfully")
      navigate("/")
    }

  };
  return (
    <form onSubmit={handleSubmit} className="mx-3">
      <h2>Add Todo</h2>
      <input
        type="text" style={todo_title} className="my-1"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      /> <br />
      <textarea name="" value={description} cols="62" rows="4" onChange={(event) => setDescription(event.target.value)} placeholder="Description"></textarea> <br />
      <input
        type="datetime-local" className="my-1"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      /> <br />
      <button type="submit" className="btn-success rounded px-4">Save</button>
    </form>
  );
};
export default AddTodo;