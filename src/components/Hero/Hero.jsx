import React, { useState } from "react";

const Hero = () => {
  const [quantity, setQuantity] = useState(1); // Estado para manejar la cantidad
  const [imageColor, setImageColor] = useState("ffffff"); // Estado para manejar el color de la imagen

  // Función para incrementar la cantidad
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  // Función para decrementar la cantidad
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Función para cambiar el color de la imagen
  const changeColor = (color) => {
    setImageColor(color);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white p-8 relative">
      {/* Botones de selección de color (vertical, a la derecha, más abajo) */}
      <div className="absolute right-10 top-2/3 flex flex-col gap-4">
        {/* Botón Blanco */}
        <button
          onClick={() => changeColor("ffffff")}
          className="w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md hover:scale-110 transition-transform"
        ></button>

        {/* Botón Negro */}
        <button
          onClick={() => changeColor("000000")}
          className="w-10 h-10 rounded-full bg-black border border-gray-300 shadow-md hover:scale-110 transition-transform"
        ></button>

        {/* Botón Azul Oscuro */}
        <button
          onClick={() => changeColor("00008b")}
          className="w-10 h-10 rounded-full bg-blue-900 border border-gray-300 shadow-md hover:scale-110 transition-transform"
        ></button>
      </div>

      {/* Contenedor principal */}
      <div className="flex items-center gap-8 w-full max-w-6xl">
        {/* Imagen dinámica */}
        <div className="flex-1">
          <img
            src={`https://via.placeholder.com/600x400/${imageColor}`} // URL dinámica con el color seleccionado
            alt={`Imagen del producto (${imageColor})`}
            className="w-full object-contain transform hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Contenido del producto */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          {/* Título */}
          <h1 className="text-4xl font-bold mb-4 text-primary">
            La tecnología del mañana, en tus manos hoy
          </h1>

          {/* Descripción */}
          <p className="text-lg mb-8 text-gray-300">
            Descubre el smartphone que redefine la innovación. Potencia, diseño
            y funcionalidad se combinan en un dispositivo creado para superar
            sus expectativas. ¡HAZLO TUYO AHORA!
          </p>

          {/* Controles de cantidad */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={decrement}
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              -
            </button>
            <span className="text-xl font-bold">{quantity}</span>
            <button
              onClick={increment}
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              +
            </button>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-center gap-4 mb-6">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition">
              Comprar ahora
            </button>
            <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
