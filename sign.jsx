import React, { useState, useEffect } from 'react';

// Componente para el botón de cerrar sesión
const SignOutButton = ({ cerrarSesion }) => (
  <a href="/" className="a-sign-out" id="container-in-header">
    <button className="button-sign-out" onClick={cerrarSesion}>
      <p>Cerrar Sesión</p>
    </button>
  </a>
);

const SignOut = () => {
  const [usuario, setUsuario] = useState(null);

  // Cargar el usuario desde el localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('user'); // Elimina el usuario del localStorage
    setUsuario(null); // Actualiza el estado a nulo
  };

  return (
    <div>
      <header className="header-container">
        <nav id="nav-container">


          {/* Mostrar el botón de Inventario solo si hay un usuario y si es vendedor */}
          {usuario && usuario.accountType === 'vendedor' && (
            <a href={`/items/?userId=${usuario._id}`} className="button-inventory" id="container-in-header">
              <button className="inventory">
                <p>Inventario</p>
              </button>
            </a>
          )}

          {/* Mostrar el botón de Cerrar Sesión solo si hay un usuario */}
          {usuario && (
            <SignOutButton cerrarSesion={cerrarSesion} />
          )}

          {/* No mostrar los botones de Iniciar Sesión y Registrarse si hay un usuario */}
          {!usuario && (
            <>
              <a href="/login" className="a-login" id="container-in-header">
                <button className="button-login">
                  <p>Iniciar Sesión</p>
                </button>
              </a>
              <a href="/register" className="a-sign-up" id="container-in-header">
                <button className="button-sign-up">
                  <p>Registrarse</p>
                </button>
              </a>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default SignOut;
