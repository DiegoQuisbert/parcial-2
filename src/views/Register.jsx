import { useState } from "react";
import { NavLink } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "El nombre es obligatorio.";
        } else if (formData.name.length < 5) {
            newErrors.name = "El nombre debe tener al menos 5 caracteres.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "El email es obligatorio.";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "El email no es válido.";
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es obligatoria.";
        } else if (formData.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
        }

        return newErrors;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const endPoint = "http://localhost:3000/api/users/";
            const config = {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(formData),
            };

            const response = await fetch(endPoint, config);
            if (!response.ok) {
                console.error(response);
            }

            const data = await response.json();
            console.log(data);

            setFormData({ name: '', email: '', password: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="row my-5 justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                    <h2 className="text-center mb-5 fw-bold">Registrar usuario</h2>
                    <div className="border rounded shadow-sm overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-4 p-xl-5">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    className="form-control"
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    autoComplete="email"
                                />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input
                                    id="name"
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={formData.name}
                                    autoComplete="name"
                                />
                                {errors.name && <small className="text-danger">{errors.name}</small>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    id="password"
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    autoComplete="new-password"
                                />
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </div>


                            <div className="d-grid mb-3">
                                <button className="btn btn-success" type="submit">
                                    Registrarse
                                </button>
                            </div>
                            <div className="d-grid">
                                <NavLink className="btn btn-dark" to="/login">Login</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;