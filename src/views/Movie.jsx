import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const getMovieById = async () => {
            const resp = await fetch(`http://localhost:3000/api/movies/${id}`);
            const data = await resp.json();
            setMovie(data);
        };

        getMovieById();
    }, [id]);

    if (!movie) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container">
            <h2 className="text-center my-5">{movie.title}</h2>
            <div className="row">
                <div className="col-md-5">
                    <img
                        src={`http://localhost:3000${movie.poster}`}
                        className="img-fluid rounded-start border-end"
                        alt={`Poster de ${movie.title}`}
                    />
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <p className="card-text">{movie.synopsis}</p>

                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Director:</strong> {movie.director}</li>
                            <li className="list-group-item"><strong>Género:</strong> {movie.genre}</li>
                            <li className="list-group-item"><strong>Año de estreno:</strong> {movie.premiere}</li>
                            <li className="list-group-item"><strong>Duración:</strong> {movie.duration} minutos</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container">
                <h2>Reseñas:</h2>
                    <ul className="list-group m-3">
                        <li className="list-group-item">

                        </li>
                        <li className="list-group-item">

                        </li>
                    </ul>
            </div>
        </div>
    );
};

export default Movie;
