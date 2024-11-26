import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('comprador');
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5005/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, accountType }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        navigate('/login'); // Redirigir al login
      } else {
        setResponseMessage(data.message);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setResponseMessage('Error en el servidor.');
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Nombre completo"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          value={email}
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          required
        >
          <option value="comprador">Comprador</option>
          <option value="vendedor">Vendedor</option>
        </select>
        <button type="submit">Registrar</button>
        <button type="button" onClick={() => navigate('/login')}>
          Volver al login
        </button>
      </form>
      {responseMessage && <div>{responseMessage}</div>}
    </div>
  );
};

export default Register;
