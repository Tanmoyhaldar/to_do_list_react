import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import useInterval from "use-interval";
const AllTodos = () => {


  // setInterval(()=>{
  //   console.log("set interval called")
  //   window.location.reload(false);
  // },1000*10)
  // window.onload()
  // hint - useInterval
  const removeUnderline = {
    textDecoration: "none",
    borderBottom: "none 0",
    color: "black"
  }
  const refresh = {
    fontSize: "30px",
    margin: "5px",
    cursor: "pointer"
  }

  const todo_item = {
    fontSize: 20,
    border: "2px solid black",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    width: "70vw",
  }
  const circle = {
    height: "25px",
    width: "25px",
    border: "1px solid black",
    borderRadius: "50%",
    background: "lightgreen"
  }
  const plus = {
    fontSize: "75px",
    color: "green",
    position: "absolute",
    right: "15px",
    cursor: "pointer"
  }

  // const todoarr = localStorage.getItem(todos);
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todos"));
    if (localTodos) {
      setTodos(localTodos);
    }
  }, []);
  // Refresh the page every 10 seconds
  useInterval(() => {
    // Fetch the latest todos from the server
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:3000/");
      const json = await response.json();
      setTodos(json);
    };
    // Save the todos to local storage
    const localTodos = JSON.stringify(todos);
    localStorage.setItem("todos", localTodos);
    // Refresh the page
    window.location.reload();
  }, 10000);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleAddTodo = () => {
    // Display the form component to add a new todo item
    navigate("/add-todo");
  };
  const getto = JSON.parse(localStorage.getItem("todos"));
  // console.log(typeof getto,"Hello");
  if (!getto) {
    return (<>
      <h1>To-do List</h1>
      <h3>No Todos in the list</h3>
      <p onClick={handleAddTodo}>
        <i class="fa fa-plus-circle" style={plus}></i>
      </p>
      {/* <input type="button" className="btn-primary rounded p-1 mx-2" value="Add First Todo" onClick={handleAddTodo} /> */}
    </>)
  }
  const filteredTodos = getto.filter((todo) => {
    // console.log("getto", getto)
    return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const deleteTodo = (id) => {
    // Get the todos from local storage
    const todos = JSON.parse(localStorage.getItem("todos"));
    // Find the todo with the specified ID
    const todo = todos.find((todo) => todo.id === id);
    // Remove the todo from the array
    todos.splice(todos.indexOf(todo), 1);
    alert("Todo Deleted Successfully");
    // Save the todos back to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
    if (!todos) {
      return <h1>No Tasks in the list</h1>;
    }
    window.location.reload();
  };

  // const clickDiv = useNavigate()

  return (
    <div className="mx-2 my-1">
      {/* <i class="fa fa-refresh" style={refresh} title="refresh"></i> <br /> */}
      {/* <h1>Todo List</h1> */}
      <h1>To-do List</h1>
      <input type="text" placeholder="Search todos..." value={searchQuery} onChange={handleSearch} />

      {filteredTodos.map((todo) => (
        <div style={{ width: "20vw" }}>
          <Link to={`/view-todo/${todo.id}`} state={{ todo: todo }}>
            <div style={todo_item}>

              {/* <p className="cir" style={circle}></p> */}
              <button className="btn btn-lg" style={{ backgroundColor: moment(todo.dueDate).isBefore(new Date()) ? "red" : "blue", }}>

              </button>
              <h3 style={removeUnderline}>{todo.title}</h3>


              {/* <p >{todo.description}</p> */}
              <p style={removeUnderline}><b>Due Time:</b> {moment(todo.dueDate).format('MMM Do YY')}</p>
            </div>
          </Link>
          <input type="button" onClick={()=>deleteTodo(todo.id)} value="Delete Todo" className="btn-danger btn-sm mx-2 rounded" />
        </div>

      ))}



      <p onClick={handleAddTodo}>
        <i class="fa fa-plus-circle" style={plus}></i>
      </p>
    </div>
  );
};
export default AllTodos;