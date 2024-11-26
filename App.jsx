import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; // Asegúrate de que el componente Login exista
import ProductList from './inventory'; // Asegúrate de que el componente Inventory exista
import Register from './register'; // Asegúrate de que el componente Register exista

function App() {
  const [user, setUser] = useState(null);

  // Función para manejar el login
  const handleLogin = (user) => {
    setUser(user); // Guardamos el usuario en el estado
  };

  return (
    <Router>
      <div className="App">
        <h1>Bienvenido a la App</h1>
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Home />} />

          {/* Ruta para el Login */}
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />} // Pasamos handleLogin a Login
          />

          <Route path="/register" element={<Register />} />

          {/* Ruta para el Inventario */}
          <Route path="/inventory" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div>
      <h2>Página Principal</h2>
      <p>Selecciona una de las opciones:</p>
      <a href="/login">Ir a Login</a>
      <br />
      <a href="/inventory">Ir a Inventario</a>
      <br />
      <a href="/register">Ir a registro</a>
    </div>
  );
};

export default App;
