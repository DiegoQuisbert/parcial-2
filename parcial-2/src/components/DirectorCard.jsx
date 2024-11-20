import React from 'react';
import '../App.css';


function DirectorCard(props) {
    return (
        <div className='card director-card mb-2'>
            <div className='card-body'>
                <h4>{props.nombre}</h4>
                <p className='card-text'>{props.biografia}</p>
                <p className='card-text'>Edad: {props.edad}</p>
            </div>
        </div>
    );
}

export default DirectorCard;
