import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (!newPassword.trim()) {
            setError('La nueva contraseña es obligatoria.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ password: newPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Error al cambiar la contraseña.');
            }

            setSuccess('Contraseña cambiada exitosamente.');
            setNewPassword('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteAccount = async () => {
        setDeleting(true);
        try {
            const response = await fetch(`http://localhost:3000/api/users/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Error al eliminar la cuenta.');
            }

            logout();
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setDeleting(false);
        }
    };

    if (!user) {
        return <p>No hay nada :/</p>;
    }

    return (
        <div className="container">
            <h2 className="text-center my-5">Mi Perfil</h2>

            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Nombre: {user?.name || 'No hay nada :/'}</h5>
                    <p className="card-text"><strong>Email:</strong> {user?.email || 'No hay nada :/'}</p>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Cambiar Contraseña</h5>

                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}

                    <form onSubmit={handlePasswordChange}>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="boton btn btn-primary">Cambiar Contraseña</button>
                    </form>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Eliminar Cuenta</h5>

                    {deleting ? (
                        <p>Eliminando tu cuenta...</p>
                    ) : (
                        <button className="boton btn btn-danger" onClick={handleDeleteAccount}>Eliminar mi cuenta</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;