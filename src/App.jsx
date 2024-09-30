import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let nextId = 0;

function App() {
  const [todoList, setTodoList] = useState([]);

  const [active, setActive] = useState("");

  const [editing, setEditing] = useState({
    isEditing: false,
    id: null
  })

  let tasks = todoList

  function handleSubmit(e) {
    e.preventDefault()
    console.log(active)
  }

  function handleChange(e) {
    let value = e.target.value
    setActive(value)
    console.log(active)
  }

  function Update() {
    const editedField = todoList.map(item => {
      if (item.id != editing.id) {
        return item
      } else {
        return {
          ...item,
          title: item.title = active
        }
      }
    })
    setEditing({
      isEditing: false,
      id: null
    })
    setTodoList(editedField);
    setActive("")
  }

  function Add() {

    if (active == "") {
      return
    }

    if (editing.isEditing == true) {
      Update()
      return
    }

    console.log(nextId)
    setTodoList([
      ...todoList,
      { id: nextId++, title: active}
    ])
    console.log(todoList)
    console.log(todoList[0])
    setActive("")
  }

  return (
    <>
    <div className="container">
      <h1>My Todo List</h1>
      <hr />
      <form onSubmit={handleSubmit}>
          <input type="text" className="field" onChange={handleChange} value={active}/>
          <button onClick={Add}className="add">{editing.isEditing ? "Change" : "Add"}</button>
        </form>

        <div className="list">
          {tasks.map(task => (
              <div className="task" key={task.id}>
                <div className="listItems">
                  <span>{task.title}</span>
                </div>

                <div className="edit">
                  <button onClick={() => {
                    setEditing(
                      {
                        isEditing: true,
                        id: task.id
                      }
                    )
                    setActive(task.title)
                  }}>Edit</button>
                </div>

                <div className="delete">
                  <button onClick={() => {

                    if (editing.isEditing == true && editing.id == task.id) {
                      setEditing({ isEditing: false, id: null }
                      )
                    }
                    
                    setTodoList(
                      todoList.filter(t => t.id !== task.id)
                    )
                  }} >Delete</button>
                </div>
            </div>
            ))}
        </div>
    </div>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
