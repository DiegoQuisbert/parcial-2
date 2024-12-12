import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import Movies from './views/Movies';
import Movie from './views/Movie';
import Director from './views/Director';
import Register from './views/Register';
import Directors from './views/Directors';
import NotFound from './views/NotFound';
import Profile from './views/Profile';

import Private from './views/Private';

import { AuthProvider, AuthContext } from './utils/AuthContext';
import { PrivateRoute } from './utils/PrivateRoute';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useContext } from 'react';

function AppContent() {
  const { token, logout } = useContext(AuthContext);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg py-4">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <NavLink className="navbar-brand logo" to="/"></NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-3 d-flex flex-row gap-3">
                  <li className="links nav-item">
                    <NavLink className="links nav-link" to="/movies">Películas</NavLink>
                  </li>
                  <li className="links nav-item">
                    <NavLink className="links nav-link" to="/directors">Directores</NavLink>
                  </li>
                  <li className='links nav-item'>
                    <NavLink className="links nav-link" to="/private">Admin ?</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <form className="d-flex mx-auto" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success boton" type="submit">Buscar</button>
            </form>

            <div className="d-flex align-items-center gap-3">
              {token ? (
                <>
                  <button className='btn btn-outline-danger boton' onClick={logout}>Logout</button>
                  <NavLink className='btn btn-success boton' to="/profile">Mi perfil</NavLink>
                </>
              ) : (
                <>
                  <NavLink className="btn btn-outline-success boton" to="/login">Login</NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/private' element={
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          } />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movies/:id' element={<Movie />} />
          <Route path='/directors' element={<Directors />} />
          <Route path='/directors/:id' element={<Director />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

      <footer></footer>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
