import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function MovieCard(props) {
    return (
        <div className='card movie-card mb-2'>
            <div className='text-center'>
                <img
                    className='card-img-top'
                    src={`http://localhost:3000${props.poster}` }
                    alt={`Poster de ${props.titulo}`}
                />
            </div>
            <div className='card-body'>
                <h5 className='card-title'>{props.titulo}</h5>
                <p className='card-text'>{props.duracion} minutos</p>
                <p className='card-text'>genero: {props.genero}</p>
                <p className='card-text'>{props.texto}</p>
                <Link className='btn btn-primary' to={`/movies/${props.id}`}>Ver más</Link>
            </div>
        </div>
    );
}

export default MovieCard;