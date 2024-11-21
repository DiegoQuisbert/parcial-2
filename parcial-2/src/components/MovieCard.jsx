import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../App.css';

function MovieCard(props) {
    const { poster, titulo, duracion, genero, texto, id } = props;

    return (
        <div className='card movie-card mb-2'>
            <div className='text-center'>
                <img
                    className='card-img-top'
                    src={poster || 'https://via.placeholder.com/300x450?text=Poster+no+disponible'} 
                    alt={`Poster de la película ${titulo}`}
                />
            </div>
            <div className='card-body'>
                <h5 className='card-title'>{titulo}</h5>
                <p className='card-text'>{duracion ? `${duracion} minutos` : 'Duración no disponible'}</p>
                <p className='card-text'>{genero ? `Género: ${genero}` : 'Género no disponible'}</p>
                <p className='card-text'>{texto || 'Descripción no disponible'}</p>
                <Link className='btn btn-primary' to={`/movies/${id}`}>Ver más</Link>
            </div>
        </div>
    );
}

// Validación de las propiedades
MovieCard.propTypes = {
    poster: PropTypes.string,
    titulo: PropTypes.string.isRequired,
    duracion: PropTypes.number,
    genero: PropTypes.string,
    texto: PropTypes.string,
    id: PropTypes.string.isRequired
};

// Propiedades por defecto
MovieCard.defaultProps = {
    poster: 'https://via.placeholder.com/300x450?text=Poster+no+disponible',
    duracion: null,
    genero: 'Desconocido',
    texto: 'Descripción no disponible',
};

export default MovieCard;
