import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import MoviePage from './page/MoviePage'; 
import TodoList from './page/TodoList';
import "./scss/home.scss";

const App = () => {
  return (
    <Router>
      <div className='home'>
        <nav className='nav'>
          <ul>
            <li>
              <NavLink 
                className='link' 
                to="/movie" 
                style={({ isActive }) => ({
                  textDecoration: isActive ? 'underline' : 'none', // ขีดเส้นใต้เมื่อลิงค์เป็นหน้า active
                  color: isActive ? 'rgb(255, 75, 75)' : 'rgb(12, 52, 253)' // เปลี่ยนสีเมื่อ active
                })}
              >
                Go to Movie Page
              </NavLink>
              <NavLink 
                className='link' 
                to="/todo-list" 
                style={({ isActive }) => ({
                  textDecoration: isActive ? 'underline' : 'none', 
                  color: isActive ? 'rgb(255, 75, 75)' : 'rgb(12, 52, 253)'
                })}
              >
                Go to Todo
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/todo-list" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
