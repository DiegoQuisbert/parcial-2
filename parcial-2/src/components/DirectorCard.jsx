import React from 'react';
import '../App.css';


function DirectorCard(props) {
    return (
        <div className='card director-card mb-2'>
            <div className="text-center">
                <img
                    className='card-img-top rounded-circle w-25'
                    src={props.photo}
                    alt={`foto de ${props.nombre}`}
                />
            </div>
            <div className='card-body'>
                <h4 className="text-center">{props.nombre}</h4>
                <p className='card-text text-center'>Edad: {props.edad}</p>
                <p className='card-text text-center'>{props.biografia}</p>
            </div>
        </div>
    );
}

export default DirectorCard;
