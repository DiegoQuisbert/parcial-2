import './App.css'
import Home from './views/Home';
import Login from './views/Login';
import Movies from './views/Movies'
import Register from './views/Register';
import Directors from './views/Directors'
import NotFound from './views/NotFound';


import {Routes, Route, NavLink, Link} from 'react-router-dom';

function App() {

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg py-4">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
            <NavLink className="navbar-brand" to="/">MovCrits</NavLink>
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
            <a className="btn btn-outline-success boton" href="#">Registrarse</a>
          </div>
        </nav>

      </header>

      <main>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/movies' element={<Movies/>} />
      <Route path='/directors' element={<Directors/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='*' element={ <NotFound/> }></Route>
    </Routes>

      <Movies />
      <Directors/>
      </main>

    </>
  )
}

export default App
