const mongoose = require("mongoose");

// Modelo de registro de usuarios
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cellphone: { type: Number }, // Opcional
    password: { type: String, required: true },
    accountType: { 
        type: String, 
        required: true,
        enum: ['comprador', 'vendedor'], // Solo permite estos valores
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
