import './App.css'
import Home from './views/Home';
import Login from './views/Login';
import Movies from './views/Movies';
import Movie from './views/Movie';
import Director from './views/Director'
import Register from './views/Register';
import Directors from './views/Directors'
import NotFound from './views/NotFound';
import Profile from './views/Profile';


import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg py-4">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <NavLink className="navbar-brand logo" to="/"></NavLink>
              <ul className="navbar-nav ms-3 d-flex flex-row gap-3">
                <li className="links nav-item">
                  <NavLink className="links nav-link" to="/movies">Películas</NavLink>
                </li>
                <li className="links nav-item">
                  <NavLink className="links nav-link" to="/directors">Directores</NavLink>
                </li>
              </ul>
            </div>
            <form className="d-flex mx-auto" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success boton" type="submit">Buscar</button>
            </form>

            {isLoggedIn ? (
              <>
              <button className='btn btn-outline-danger boton' onClick={handleLogout}>Logout</button>
              <NavLink className='btn btn-success boton' to="/profile">Mi perfil</NavLink>
              </>
            ) : (
              <>
              <NavLink className="btn btn-outline-success boton" to="/login">Login</NavLink>
              <NavLink className="btn btn-outline-success boton" to="/register">Registrarse</NavLink>
              </>
            )}
          </div>
        </nav>
      </header>


      <main>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movies/:id' element={<Movie />} />
          <Route path='/directors' element={<Directors />} />
          <Route path='/directors/:id' element={<Director />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>

      </main>


      <footer>

      </footer>
    </>
  )
}

export default App
