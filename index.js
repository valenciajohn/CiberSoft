const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Cargar variables de entorno desde .env

const app = express();
const User = require("./User"); // Modelo del usuario
const Log = require("./Log"); // Modelo de logs
const verifyToken = require("./verifyToken"); // Middleware para verificar tokens
const verifyRole = require("./verifyRole"); // Middleware para verificar roles

app.use(express.json());
app.use(cors());

// Verificar que las variables de entorno estén definidas
const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 5008;

if (!mongoUri) {
    console.error("Error: La variable MONGODB_URI no está definida en el archivo .env");
    process.exit(1); // Detener la ejecución si no hay URI
}

// Conectar a MongoDB
mongoose.connect(mongoUri)
    .then(() => console.log("Conexión exitosa a MongoDB"))
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error.message);
        process.exit(1); // Detener la ejecución si no se conecta
    });

// Ruta para registrar un nuevo usuario
app.post("/register", async (req, res) => {
    const { name, email, password, accountType } = req.body;

    if (!name || !email || !password || !accountType) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const validAccountTypes = ["comprador", "vendedor"];
    if (!validAccountTypes.includes(accountType)) {
        return res.status(400).json({ message: `accountType debe ser uno de los siguientes: ${validAccountTypes.join(", ")}` });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "El correo ya está registrado." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            accountType,
        });

        await newUser.save();

        res.status(201).json({ message: "Usuario registrado exitosamente." });
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        res.status(500).json({ message: "Hubo un error al registrar el usuario.", error: error.message });
    }
});

// Ruta para iniciar sesión
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            await Log.create({ action: "LOGIN", email, status: "FAILED" });
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            await Log.create({ action: "LOGIN", email, status: "FAILED" });
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, accountType: user.accountType },
            process.env.JWT_SECRET || "secretKey",
            { expiresIn: "1h" }
        );

        await Log.create({ action: "LOGIN", email, status: "SUCCESS" });

        res.status(200).json({
            message: "Inicio de sesión exitoso.",
            token,
        });
    } catch (error) {
        console.error("Error en el login:", error.message);
        res.status(500).json({ message: "Error interno del servidor." });
    }
});

// Ruta protegida para obtener perfil
app.get("/profile", verifyToken, async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        accountType: user.accountType,
    });
});

// Ruta protegida para vendedores
app.get("/vendedor/dashboard", verifyToken, verifyRole(["vendedor"]), (req, res) => {
    res.status(200).json({ message: "Bienvenido al panel del vendedor." });
});

// Iniciar el servidor
app.listen(port, (err) => {
    if (err) {
        console.error(`Error al iniciar el servidor: ${err.message}`);
        process.exit(1);
    }
    console.log(`Servidor funcionando en el puerto ${port}`);
});
