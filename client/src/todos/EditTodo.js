import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditTodo = () => {

  const navigate = useNavigate();

  const {id} = useParams();

  const [todo, setTodo] = useState({
    description: "",
    priority: "",
    targetDate: "",
    done: false
  });

  useEffect(() => {
    loadTodo();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8081/api/todo/${id}`, todo);
    navigate("/");
  }

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: name === 'priority' ? parseInt(value) : value });
  };

  const loadTodo = async () => {
    const result = await axios.get(`http://localhost:8081/api/todo/${id}`);
    setTodo(result.data);
  }

  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-3 offset-md-4 border rounded p-4 m3 shadow'>
          <h2 className='text-center'>Edit Item</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor='Description' className='form-label'>
                Description
              </label>
              <input 
              type='text' 
              className='form-control' 
              placeholder='Enter what you need to do' 
              name = "description" 
              value={todo.description} 
              onChange={(e) => onInputChange(e)}
              /> 
            </div>
            <div className='mb-3'>
              <p>Priority</p>
              <div className="form-check form-check-inline mx-3">
                <input 
                className="form-check-input" 
                type="radio" 
                name="priority" 
                value={1}  
                onChange={(e) => onInputChange(e)} 
                checked={todo.priority === 1}
                />
                <label className="form-check-label" htmlFor="Priority1">1</label>
              </div>
              <div className="form-check form-check-inline">
                <input 
                className="form-check-input" 
                type="radio" name="priority" 
                value={2} 
                onChange={(e) => onInputChange(e)} 
                checked={todo.priority === 2}
                />
                <label className="form-check-label" htmlFor="Priority2">2</label>
              </div>
              <div className="form-check form-check-inline">
                <input 
                className="form-check-input" 
                type="radio" 
                name="priority" 
                value={3} 
                onChange={(e) => onInputChange(e)} 
                checked={todo.priority === 3}
                />
                <label className="form-check-label" htmlFor="Priority3">3</label>
              </div>
            </div>
            <div className='mb-4'>
              <label htmlFor='TargetDate' className='form-label'>
                Target Date
              </label>
              <input 
              type='date' 
              className='form-control' 
              name = "targetDate" 
              value={todo.targetDate} 
              onChange={(e) => onInputChange(e)}
              /> 
            </div>
            <div className="d-flex justify-content-center">
              <button type='submit' className='btn btn-outline-primary'>
                Submit
              </button>
              <Link className='btn btn-outline-danger mx-1' to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTodo