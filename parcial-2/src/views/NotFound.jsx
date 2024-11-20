import { Link } from "react-router-dom";

const NotFound = () => {

    return (
        <div className="container mt-2">
            <div className="card">
                <h2 className="text-center fw-bold">404</h2>
                <p className="text-center">No se encontró nada por acá</p>
                <Link className="btn btn-danger boton" to='/'>Regresar al inicio</Link>
            </div>
        </div>
    )
}

export default NotFound;