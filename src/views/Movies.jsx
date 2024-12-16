import MovieCard from '../components/MovieCard';
import { useState, useEffect } from "react";

const Movies = () => {
    const [recargar, setRecargar] = useState(false);
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [genreFilter, setGenreFilter] = useState('');

    useEffect(() => {
        const getMovies = async () => {
            let endPoint = 'http://localhost:3000/api/movies';
            
            if (searchTitle) {
                endPoint += `?title=${searchTitle}`;
            }
            if (genreFilter) {
                endPoint += (endPoint.includes('?') ? '&' : '?') + `genre=${genreFilter}`;
            }
            
            const resp = await fetch(endPoint);
            const data = await resp.json();
            const dataMovies = data.map(movie => {
                return {
                    id: movie._id,
                    nombre: movie.title,
                    director: movie.director,
                    genero: movie.genre,
                    estreno: movie.premiere,
                    duration: movie.duration,
                    sinopsis: movie.synopsis,
                    poster: movie.poster,
                };
            });
            setMovies(dataMovies);
        };

        getMovies();
    }, [recargar, searchTitle, genreFilter]);
    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenreFilter(e.target.value);
    };

    return (
        <div className='container mt-4'>
            <h3 className='text-center fw-bold mb-4'>Películas</h3>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre..."
                    value={searchTitle}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="mb-3">
                <select
                    className="form-select"
                    value={genreFilter}
                    onChange={handleGenreChange}
                >
                    <option value="">Seleccionar Género</option>
                    <option value="drama">Drama</option>
                    <option value="crimen">Crimen</option>
                    <option value="fantasia">Fantasía</option>
                    <option value="accion">Acción</option>
                    <option value="ciencia ficcion">Ciencia Ficción</option>
                    <option value="animacion">Animación</option>
                </select>
            </div>

            <div className="row">
                {
                    movies.map((movie) => (
                        <div className="col-md-4" key={movie.id}>
                            <MovieCard
                                id={movie.id}
                                titulo={movie.nombre}
                                director={movie.director}
                                estreno={movie.estreno}
                                duracion={movie.duration}
                                genero={movie.genero}
                                texto={movie.sinopsis}
                                poster={movie.poster}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Movies;