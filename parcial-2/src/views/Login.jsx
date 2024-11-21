import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);  // Estado para el botón de carga
    const [error, setError] = useState(null);       // Estado para el error
    const navigate = useNavigate();                 // Hook para redirigir

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);  // Limpiar cualquier error previo

        try {
            console.log("Login data:", formData);

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
                throw new Error("Error en el login");
            }

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (data?.data?.jwt) {
                localStorage.setItem("token", data.data.jwt);
                console.log("Token guardado en localStorage:", data.data.jwt);

                // Redirigir al usuario después de iniciar sesión exitosamente
                navigate("/movies");
            }

            setFormData({ email: "", password: "" });
        } catch (error) {
            console.error("Error al intentar loguear:", error);
            setError("Credenciales incorrectas, por favor intente nuevamente.");
        } finally {
            setLoading(false);  // Rehabilitar el botón una vez se complete la solicitud
        }
    };

    return (
        <div className="container">
            <div className="row my-5 justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                    <h2 className="text-center mb-5 fw-bold">Iniciar sesión</h2>
                    <div className="border rounded shadow-sm overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-4 p-xl-5">
                            {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar el mensaje de error */}
                            
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-envelope"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                        </svg>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={formData.email}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">
                                    Contraseña
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    required
                                />
                            </div>

                            <div className="d-grid mb-3">
                                <button
                                    className="btn btn-success boton"
                                    type="submit"
                                    disabled={loading} // Deshabilitar mientras se procesa
                                >
                                    {loading ? "Cargando..." : "Iniciar sesión"}
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
