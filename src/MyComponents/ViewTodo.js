import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import moment from 'moment'

const ViewTodo = (props) => {

    const location = useLocation()
    const {todo} = location.state

    const circle = {
        height: "20px",
        width: "20px",
        border: "2px solid black",
        borderRadius: "50%",
        marginLeft: "10px",
        background: "#8DE84D"
    }
  return (
    <div>
        <span id="item-1" className="list">
            <Link to='/'>Go Back</Link>
        </span>
    <h1>Todo Detail</h1>
    <h3>{todo.title}</h3>
    <p>{todo.description}</p>
    <p>{moment(todo.dueDate).format('MMM Do YYYY')}</p>
       {/* <div className="todo-title" style={todo_title} id=''>{todo.title}</div>
       <div className="todo-desc" style={todo_desc} id=''>{todo.desc}</div>
       <div className="due-date">{todo.dueDate}</div> */}
       {/* <div className="sts" style={sts}>
            Status <div className="cir" style={circle}></div>
       </div> */}
       
    </div>
  )
}
export default ViewTodo;
