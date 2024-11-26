const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    nameItem: { type: String, required: true },
    descriptionItem: { type: String, required: true },
    priceItem: { type: Number, required: true },
    quantityItem: { type: Number, required: true },
    image: { type: String, required: true },
    itemType: { 
        type: String, 
        required: true,
        enum: ['computadores', 'celulares', 'electrohogar', 'accesorios', 'zona gamer', ] // Solo permite estos valores
    },  
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Asocia cada producto con el ID del usuario

});

const Items = mongoose.model( 'products', itemSchema);

module.exports = Items;