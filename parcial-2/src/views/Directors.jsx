import DirectorCard from '../components/DirectorCard';
import { useState, useEffect } from "react";

const Directors = () => {

    let [recargar, setRecargar] = useState(false);
    let [director, setDirectors] = useState([]);

    useEffect(() => {
        console.log('Componente renderizado');
        const getDirectors = async () => {
            const resp = await fetch('http://localhost:3000/api/directors');
            const data = await resp.json();
            const dataDirectors = data.map(director => {
                return {
                    id: director._id,
                    nombre: director.compName,
                    edad: director.age,
                    biografia: director.biography,
                };
            });
            console.log(dataDirectors);
            setDirectors(dataDirectors);
        };

        getDirectors();

    }, [recargar]);

    const iniciarRecarga = () => {
        setRecargar(!recargar);
    }

    return (
        <div className='container mt-2'>
            <h3 className='text-center fw-bold mb-4'>Directores</h3>
            <div className="row">
                {
                    director.map((director) => (
                        <div className="col-md-4" key={director.id}>
                            <DirectorCard
                                id={director.id}
                                nombre={director.nombre}
                                edad={director.edad}
                                biografia={director.biografia}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Directors;
