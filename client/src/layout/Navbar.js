import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            To do application
          </Link>
          <ul className='navbar-nav'>
            <li className='nav-item m-1'>
              <Link className='btn btn-outline-warning' to="/">Home</Link>
            </li>
            <li className='nav-item m-1'>
              <Link className='btn btn-outline-warning' to="/add">Add Item</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar