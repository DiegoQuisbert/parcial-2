import ReviewCard from "../components/ReviewCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Movie = () => {
    const { id } = useParams();
    const [movieData, setMovieData] = useState(null);
    const userId = "id-del-usuario-autenticado"; // Debes obtener esto de tu sistema de autenticación.

    useEffect(() => {
        const getMovieById = async () => {
            const resp = await fetch(`http://localhost:3000/api/movies/${id}`);
            const data = await resp.json();
            setMovieData(data.data);
        };

        getMovieById();
    }, [id]);

    if (!movieData) {
        return <p>No se encontró la película</p>;
    }

    const { movie, reviews } = movieData;

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

            <ReviewCard reviews={reviews} movieId={movie._id} userId={userId} />
        </div>
    );
};

export default Movie;
