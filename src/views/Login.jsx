import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors = {};
        
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const endPoint = "http://localhost:3000/api/users/login";
            const config = {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(formData),
            };

            const response = await fetch(endPoint, config);
            if (!response.ok) {
                throw new Error("Credenciales incorrectas");
            }

            const data = await response.json();

            if (data.data.jwt) {
                login("ok", data.data.jwt);
                navigate("/");
            } else {
                setErrors({ general: "Credenciales erróneas, por favor intente nuevamente." });
            }
        } catch (error) {
            setErrors({ general: "Hubo un error al iniciar sesión, intente más tarde." });
        }
    };

    return (
        <div className="container">
            <div className="row my-5 justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                    <h2 className="text-center mb-5 fw-bold">Iniciar sesión</h2>
                    <div className="border rounded shadow-sm overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-4 p-xl-5">
                            {errors.general && <div className="alert alert-danger">{errors.general}</div>}

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    autoComplete="email"
                                />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
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
                                    autoComplete="current-password"
                                />
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </div>

                            <div className="d-grid mb-3">
                                <button className="btn btn-success boton" type="submit">
                                    Login
                                </button>
                            </div>

                            <div className="d-grid">
                                <NavLink className="btn btn-dark btn-lg boton" to="/register">
                                    Registrarse
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;