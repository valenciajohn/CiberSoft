import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5005/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inicio de sesión exitoso.");
        localStorage.setItem("token", data.token);
        window.location.href = "/inventory"; // Cambiado a una ruta React
      } else {
        setResponseMessage(data.message);
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setResponseMessage("Error en el servidor. Por favor, inténtalo más tarde.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Iniciar sesión</button>
        <button type="button" onClick={() => (window.location.href = "/register")}>
          Registrar
        </button>
      </form>
      {responseMessage && <div>{responseMessage}</div>}
    </div>
  );
};

export default Login;
