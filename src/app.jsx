import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { SpaceBar } from './spacebar/SpaceBar';

function App() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <nav>
              <div className='navbar-brand'>
              Space Salary
              </div>
              <menu className='navbar-nav'>
                <li className='nav-item'>
                  <NavLink className='nav-link' to=''>
                    Login
                  </NavLink>
                </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to=''>
                      Spacebar
                    </NavLink>
                  </li>
              </menu>
            </nav>
          </header>
  
          <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/spacebar' element={<SpaceBar/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }

  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }

  export default App;