import React from 'react'
import { HashRouter, Routes as Switch, Route, Link } from 'react-router-dom'
import ViewTodo from './ViewTodo'
import AddTodo from './AddTodo'
import AllTodos from './AllTodos'

export default function CheckRouter() {
  return (
    <>
    <HashRouter>
    <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">AllTodos</Link>
            </li>
            <li>
              <Link to="/view-todo">View Todo</Link>
            </li>
            <li>
              <Link to="/add-todo">Add Todo</Link>
            </li>
          </ul>
        </nav> */}

        <Switch>
            
          <Route path="/" element={<AllTodos/>}></Route>
          <Route path="/view-todo/:id" element={<ViewTodo/>}></Route>
          <Route path="/add-todo" element={<AddTodo/>}></Route>
        </Switch>
      </div>
    </HashRouter>
    </>
  )
}
