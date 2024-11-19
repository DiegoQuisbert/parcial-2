import React from 'react';
import Button from './Button'
import '../App.css'
import { Link } from 'react-router-dom';

function Card(props) {
    return ( 
        <div className='card' style={{width: '18rem'}}>
            <img className='card-img-top' src={props} alt="poster de película"/>
            <div className='card-body'>
                <h4> {props.texto} </h4>
                    <p className='card-text'>$ {props.precio + 10}</p>
                    <a href='#' className='btn btn-primary'>Go somewhere</a>
                    <Button className='btn btn-primary' text="agregar" color="green"></Button>
                    <Link to={`/details/${props.id}`}>Detalle</Link>
            </div>
        </div>
    )
}


export default Card;