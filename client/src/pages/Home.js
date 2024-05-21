import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

const Home = () => {


  const [todos, setTodos] = useState([]);

  
  useEffect(() => {
    loadTodos();
  }, []);


  const loadTodos = async () => {
    const result = await axios.get("http://localhost:8081/api/todo");
    setTodos(result.data);
  }

  const deleteTodos = async (id) => {
    await axios.delete(`http://localhost:8081/api/todo/${id}`);
    loadTodos();
  }

  const handleDoneChange = async (e, id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? {...todo, done: e.target.checked} : todo
    );
    setTodos(updatedTodos);

    const updatedTodo = updatedTodos.find((todo) => todo.id === id);
    await axios.put(`http://localhost:8081/api/todo/${id}`, updatedTodo);
  }


  return (
    <div className='container'>
      <div className='my-5 p-4'>
        <table className='table table-striped border shadow'>
          <thead>
            <tr>
              <th scope="col">Nr</th>
              <th scope="col">Description</th>
              <th scope="col">Priority</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
              <th scope='col'>Is done?</th>
            </tr>
        </thead>
          <tbody>
            {
              todos.map((todo, index) => (
                <tr key={index} className={todo.done ? 'crossout' : ''}>
                  <th scope='row' key={index}>{index+1}</th>
                  <td>{todo.description}</td>
                  <td>{todo.priority}</td>
                  <td>{todo.targetDate}</td>
                  <td>
                    <Link className='btn btn-primary mx-1' to={`/edit/${todo.id}`}>
                      Edit
                    </Link>
                    <button className='btn btn-danger mx-1' onClick={() => deleteTodos(todo.id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <input className="form-check-input" type="checkbox" name="done" value={todo.done} checked={todo.done} onChange={(e) => handleDoneChange(e, todo.id)}/>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home