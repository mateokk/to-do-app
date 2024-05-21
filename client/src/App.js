import './App.css';
import Navbar from './layout/Navbar';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddTodo from './todos/AddTodo';
import EditTodo from './todos/EditTodo';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add" element={<AddTodo/>}/>
          <Route path="/edit/:id" element={<EditTodo/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
