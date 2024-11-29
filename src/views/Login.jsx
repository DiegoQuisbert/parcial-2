import { useContext, useState } from "react";
import { NavLink, useInRouterContext} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endPoint = "http://localhost:3000/api/users/login";
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(formData),
            };

            const response = await fetch(endPoint, config);
            if (!response.ok) {
                throw new Error("Credenciales incorrectas");
            }

            const data = await response.json();

            if(data.data.jwt) {
                login('ok', data.data.jwt);
                navigate('/')
            }else{
                console.log('credenciales erróneas');
            }

        } catch (error) {
            console.log("Credenciales incorrectas, por favor intente nuevamente.");
        }
    };

    return (
        <div className="container">
            <div className="row my-5 justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                    <h2 className="text-center mb-5 fw-bold">Iniciar sesión</h2>
                    <div className="border rounded shadow-sm overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-4 p-xl-5">

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    required
                                    autoComplete="current-password"
                                />
                            </div>

                            <div className="d-grid mb-3">
                                <button
                                    className="btn btn-success boton"
                                    type="submit"
                                >
                                    login
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
