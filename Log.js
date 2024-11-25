const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    action: { type: String, required: true }, // Ejemplo: "LOGIN"
    email: { type: String, required: true },
    status: { type: String, required: true }, // Ejemplo: "SUCCESS" o "FAILED"
    timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
