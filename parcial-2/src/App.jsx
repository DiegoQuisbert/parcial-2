import './App.css'
import Card from './components/Card';

function App() {

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg py-4">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <a className="navbar-brand" href="#">MovCrits</a>
              <ul className="navbar-nav ms-3 d-flex flex-row gap-3">
                <li className="links nav-item">
                  <a className="links nav-link" href="#">Películas</a>
                </li>
                <li className="links nav-item">
                  <a className="nav-link" href="#">Directores</a>
                </li>
              </ul>
            </div>
            <form className="d-flex mx-auto" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success boton" type="submit">Buscar</button>
            </form>
            <a className="btn btn-outline-success boton" href="#">Iniciar Sesión</a>
          </div>
        </nav>

      </header>

      <main>
        <div className="row">
          <div className="col-6 position-relative overflow-hidden">
            <img
              src="../public/img/fondo.png"
              alt="Ejemplo"
              className="fondo"
            />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h3 className="fw-bold">Hola</h3>
            <p>¿Te gustaría leer opiniones de verdaderos espectadores en lugar de supuestos críticos o gente sobornada?, MovCrit es tu lugar, En nuestro sitio serás perfectamente capaz de reseñar tus películas favoritas mediante comentarios, ¡libre para todo el mundo!</p>
            <p>Iniciá sesión ahora y compartinos tu opinión sobre cualquier pelícua</p>
          </div>
        </div>

        <hr />
        
        <div className='container mt-2'>
          <h3 className='text-center fw-bold'>Películas</h3>
          <Card></Card>
        </div>
      
        <div className='container mt-2'>
          <h3 className='text-center fw-bold'>Directores</h3>
          <Card></Card>
        </div>

      </main>



    </>
  )
}

export default App
