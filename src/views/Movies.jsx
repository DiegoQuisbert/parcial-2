import MovieCard from '../components/MovieCard';
import { useState, useEffect } from "react";

const Movies = () => {
    const [recargar, setRecargar] = useState(false);
    const [movie, setMovies] = useState([]);

    useEffect(() => {
        console.log('Componente renderizado');
        const getMovies = async () => {
            const endPoint = 'http://localhost:3000/api/movies'
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
            console.log(dataMovies);
            setMovies(dataMovies);
        };

        getMovies();
    }, [recargar]);


    return (
        <div className='container mt-4'>
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
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Movies;
