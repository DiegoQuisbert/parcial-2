import MovieCard from '../components/MovieCard';
import { useState, useEffect } from "react";

const Movies = () => {
    const [recargar, setRecargar] = useState(false);
    const [movie, setMovies] = useState([]);

    useEffect(() => {
        console.log('Componente renderizado');
        const getMovies = async () => {
            const resp = await fetch('http://localhost:3000/api/movies');
            const data = await resp.json();
            const dataMovies = data.map(movie => {
                return {
                    id: movie._id,
                    nombre: movie.title,
                    sinopsis: movie.synopsis,
                    poster: movie.poster,
                    genre: movie.genre,
                    duration: movie.duration
                };
            });
            console.log(dataMovies);
            setMovies(dataMovies);
        };

        getMovies();
    }, [recargar]);

    const iniciarRecarga = () => {
        setRecargar(!recargar);
    };

    return (
        <div className='container'>
            <h3 className='text-center fw-bold mb-4'>Películas</h3>

            <div className="row">
                {
                    movie.map((movie) => (
                        <div className="col-md-4" key={movie.id}>
                            <MovieCard
                                id={movie.id}
                                titulo={movie.nombre}
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
