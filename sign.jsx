import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Elimina el token JWT del localStorage
        localStorage.removeItem('jwt');
        
        // Redirige al usuario a la página de inicio de sesión
        navigate('/login');
    };

    return (
        <div className="signout-container">
            <button onClick={handleSignOut} className="signout-button">
                Cerrar sesión
            </button>
        </div>
    );
};

export default SignOut;
