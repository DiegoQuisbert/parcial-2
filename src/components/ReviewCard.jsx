import React, { useState } from 'react';
import '../App.css';

function ReviewCard({ reviews, movieId, userId }) {
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');
    const [localReviews, setLocalReviews] = useState(reviews);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!reviewText.trim()) {
            setError('La reseña no puede estar vacía.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/reviews/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    review: reviewText,
                    userId,
                    movieId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Error al enviar la reseña.');
            }

            const data = await response.json();
            setReviewText(''); 

            setLocalReviews([data.data, ...localReviews]); 

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container mt-2">
            <h2>Reseñas:</h2>

            <div className="container-fluid">
                <form className="d-flex" onSubmit={handleSubmit}>
                    <input
                        className="form-control me-2"
                        type="text"
                        placeholder="Escribe una reseña"
                        aria-label="Escribe una reseña"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Enviar
                    </button>
                </form>
                {error && <p className="text-danger mt-2">{error}</p>}
            </div>

            <div className="card-body">
                <ul className="list-group m-3">
                    {localReviews && localReviews.length > 0 ? (
                        localReviews.map((review) => (
                            <li key={review._id} className="list-group-item">
                                <h5 className="card-title">{review.user.name}:</h5>
                                <p className="card-text mt-2">{review.review}</p>
                                <p className="card-text">
                                    {new Date(review.created).toLocaleString()}
                                </p>
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item">No hay reseñas para esta película.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default ReviewCard;
