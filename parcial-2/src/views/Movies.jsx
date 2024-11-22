import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();  // Para obtener el parámetro de búsqueda

    const searchQuery = searchParams.get("name"); // Obtener el parámetro "name" de la búsqueda

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const url = searchQuery
                    ? `http://localhost:3000/api/movies?name=${searchQuery}` // URL con parámetro de búsqueda
                    : "http://localhost:3000/api/movies"; // Si no hay búsqueda, cargar todas las películas

                const resp = await fetch(url);
                if (!resp.ok) {
                    throw new Error("Error al cargar películas.");
                }

                const data = await resp.json();
                setMovies(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [searchQuery]);  // Dependencia en searchQuery para actualizar las películas cuando cambie

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
<<<<<<< HEAD:src/views/Movies.jsx
        <div className='container'>
            <h3 className='text-center fw-bold mb-4'>Películas</h3>
            
            <div className="row">
                {
                    movie.map((movie) => (
                        <div className="col-md-4" key={movie.id}>
                            <MovieCard
                                id={movie.id}
                                titulo={movie.nombre}
                                director={movie.director}
                                estreno={movie.premiere}
                                duracion={movie.duration}
                                genero={movie.genero}
                                texto={movie.sinopsis}
                                poster={movie.poster}
                            />
=======
        <div className="container my-5">
            <h2 className="text-center mb-4">Películas</h2>
            {movies.length === 0 ? (
                <p className="text-center">No se encontraron películas.</p>
            ) : (
                <div className="row">
                    {movies.map((movie) => (
                        <div key={movie.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img
                                    src={movie.poster}
                                    className="card-img-top"
                                    alt={`Poster de ${movie.title}`}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <Link to={`/movies/${movie.id}`} className="btn btn-primary">
                                        Ver detalles
                                    </Link>
                                </div>
                            </div>
>>>>>>> 5aadbd4c8c789dfb384d107337a333b5e8728217:parcial-2/src/views/Movies.jsx
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Movies;
