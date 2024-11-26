import { useNavigate } from 'react-router-dom';
import { loginUser } from './services/itemServices';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());

        try {
            const response = await loginUser(data);
            localStorage.setItem('token', response.token); // Guarda el token JWT
            navigate('/inventory'); // Redirige al inventario
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Correo electrónico" required />
            <input name="password" type="password" placeholder="Contraseña" required />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default Login;
