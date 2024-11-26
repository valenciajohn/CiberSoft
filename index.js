const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

// Modelos
const Item = require("./items"); // Modelo de productos
const User = require("./User"); // Modelo de usuario

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/upload", express.static(path.join(__dirname, "upload"))); // Servir archivos estáticos de la carpeta `upload`

// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "upload");
    cb(null, uploadPath); // Carpeta de destino
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Guardar con un nombre único
  },
});
const upload = multer({ storage });

// Conexión a MongoDB
const mongoUri = process.env.MONGODB_URI;
mongoose
  .connect(mongoUri)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error al conectar a la base de datos", error));

// Middleware para verificar token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

/** Rutas **/

// Obtener todos los productos
app.get("/products", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// Obtener productos por usuario
app.get("/items", verifyToken, async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "Se requiere userId" });
  }
  try {
    const items = await Item.find({ userId });
    res.json(items);
  } catch (error) {
    console.error("Error al obtener productos por usuario:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

app.get("/items/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
      return res.status(400).json({ error: "Se requiere userId" });
  }
  try {
      const items = await Item.find({ userId });
      res.json(items);
  } catch (error) {
      console.error("Error al obtener productos por usuario:", error);
      res.status(500).json({ error: "Error al obtener los productos" });
  }
});


// Agregar un nuevo producto
app.post("/items", verifyToken, upload.single("image"), async (req, res) => {
  const { nameItem, descriptionItem, priceItem, quantityItem, itemType, userId } = req.body;

  if (!nameItem || !descriptionItem || !priceItem || !quantityItem || !itemType || !userId) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  if (!["computadores", "celulares", "electrohogar", "accesorios", "zona gamer"].includes(itemType)) {
    return res.status(400).json({ message: "Tipo de producto no válido." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Por favor, selecciona una imagen." });
  }

  try {
    const imageUrl = `http://localhost:${process.env.PORT || 5005}/upload/${req.file.filename}`;
    const newItem = new Item({
      nameItem,
      descriptionItem,
      priceItem,
      quantityItem,
      image: imageUrl,
      userId,
      itemType,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error al agregar producto:", error);
    res.status(500).json({ message: "Hubo un error al agregar el producto." });
  }
});

// Actualizar un producto
app.put("/items/:id", verifyToken, upload.single("image"), async (req, res) => {
  const { nameItem, descriptionItem, priceItem, quantityItem } = req.body;
  const updatedData = { nameItem, descriptionItem, priceItem, quantityItem };

  if (req.file) {
    updatedData.image = `http://localhost:${process.env.PORT || 5005}/upload/${req.file.filename}`;
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedItem);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Hubo un error al actualizar el producto." });
  }
});

// Eliminar un producto
app.delete("/items/:id", verifyToken, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Hubo un error al eliminar el producto." });
  }
});

// Registrar un usuario
app.post("/register", async (req, res) => {
  const { name, email, password, accountType } = req.body;

  if (!name || !email || !password || !accountType) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  if (!["comprador", "vendedor"].includes(accountType)) {
    return res.status(400).json({ message: "Tipo de cuenta no válido." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, accountType });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    res.status(500).json({ message: "Hubo un error al registrar el usuario." });
  }
});

// Iniciar sesión
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos." });
    }

    const token = jwt.sign({ userId: user._id, accountType: user.accountType }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión." });
  }
});

// Servidor
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
