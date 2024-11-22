import { useState, useEffect } from "react";

const Home = () => {

    let [recargar, setRecargar] = useState(false);

    const iniciarRecarga = () => {
        setRecargar(!recargar);
    }

    return (
        <div className="container-fluid mb-4">
            <div className="row mx-0">
                <div className="col-6 position-relative overflow-hidden">
                    <img
                        src="../public/img/fondo.png"
                        alt="Ejemplo"
                        className="fondo cuadro"
                    />
                </div>
                <div className="col-5 d-flex flex-column justify-content-center p-0 overflow-hidden">
                    <h3 className="fw-bold">Bienvenido a MovCrits</h3>
                    <p>
                        ¿Te gustaría leer opiniones de verdaderos espectadores en lugar de supuestos críticos o gente sobornada?, MovCrit es tu lugar, En nuestro sitio serás perfectamente capaz de reseñar tus películas favoritas mediante comentarios, ¡libre para todo el mundo!
                    </p>
                    <p>
                        Iniciá sesión ahora y compartinos tu opinión sobre cualquier película.
                    </p>
                </div>
            </div>

            <div className="container-fluid">
                <img />
                <div className="">
                    <h2 className="fw-bold text-center"> hola </h2>
                    <p className="text-center">hola</p>
                </div>

            </div>
        </div>
    )
}

export default Home;