import { useState, useEffect } from "react";

const Home = () => {

    let [recargar, setRecargar] = useState(false);
    let [movie, setMovies] = useState([]);

    useEffect(() => {
        console.log('Componente renderizado');
        const getMovies = async () => {
            const resp = await fetch('http://localhost:3000/api/movies')
            const data = await resp.json();
            const dataMovies = data.map(movie => {
                return { id: movie._id, nombre: movie.title, sinopsis: movie.synopsis, poster: movie.poster, genre: movie.genre, duration: movie.duration };
            });
            console.log(dataMovies);
            setMovies(dataMovies);
        }

        getMovies();

    }, [recargar]);

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
        </div>
    )
}

export default Home;