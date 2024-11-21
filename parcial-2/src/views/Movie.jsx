import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Movie = ({ isLoggedIn }) => {
    const { id } = useParams(); // Obtener el ID de la película desde la URL
    const [movie, setMovie] = useState(null);
    const [review, setReview] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/movies/${id}`);
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                setMessage("Error al cargar los detalles de la película");
            }
        };

        fetchMovie();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            setMessage("Debes estar logueado para dejar una reseña.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/movies/${id}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Enviar el token JWT
                },
                body: JSON.stringify({ review }),
            });

            if (!response.ok) throw new Error("Error al enviar la reseña");

            setMessage("Reseña enviada exitosamente");
            setReview(""); // Limpiar el campo del formulario
        } catch (error) {
            setMessage("Hubo un problema al enviar la reseña.");
        }
    };

    return (
        <div className="container">
            {movie ? (
                <>
                    <h2>{movie.title}</h2>
                    <img src={movie.poster} alt={movie.title} className="img-fluid" />
                    <p>{movie.description}</p>

                    <hr />
                    <h4>Deja una reseña:</h4>

                    {/* Mostrar el mensaje de éxito o error */}
                    {message && <p>{message}</p>}

                    {/* Formulario de reseña solo si el usuario está logueado */}
                    {isLoggedIn ? (
                        <form onSubmit={handleReviewSubmit}>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                className="form-control"
                                rows="4"
                                placeholder="Escribe tu reseña"
                            />
                            <button type="submit" className="btn btn-primary mt-3">
                                Enviar Reseña
                            </button>
                        </form>
                    ) : (
                        <p>Inicia sesión para dejar una reseña.</p>
                    )}
                </>
            ) : (
                <p>Cargando película...</p>
            )}
        </div>
    );
};

export default Movie;
