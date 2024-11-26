import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaShoppingCart, FaCog, FaUser, FaGlobe, FaWallet } from "react-icons/fa"; // Importar el ícono de billetera
import DarkMode from "./DarkMode";

const Navbar = () => {
    const [language, setLanguage] = useState("ES"); // Estado para manejar el idioma

    // Función para alternar entre español e inglés
    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "ES" ? "EN" : "ES"));
    };

    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
            <div className="py-4">
                <div className="container flex items-center justify-between">
                    {/* Search Bar Section (Izquierda) */}
                    <div className="flex items-center gap-4">
                        <div className="relative group hidden sm:block">
                            <input
                                type="text"
                                placeholder="Buscar"
                                className="w-48 p-2 border border-gray-300 rounded-md dark:border-gray-700"
                            />
                            <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
                        </div>
                    </div>

                    {/* Logo (Centro) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <a
                            href="#"
                            className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
                        >
                            CyberShop
                        </a>
                    </div>

                    {/* Navbar sección derecha */}
                    <div className="flex items-center gap-4">
                        {/* Login Button Section */}
                        <div className="relative">
                            <button className="text-xl text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary duration-200">
                                <FaUser />
                            </button>
                        </div>

                        {/* Order Button Section */}
                        <div className="relative">
                            <button className="relative">
                                <FaShoppingCart className="text-xl text-gray-600 dark:text-gray-400" />
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    4
                                </span>
                            </button>
                        </div>

                        {/* Configuración - Solo ícono de engranaje */}
                        <div className="relative cursor-pointer group">
                            <button className="flex items-center gap-[8px] text-gray-500 hover:text-black dark:hover:text-white py-2 duration-200">
                                <FaCog className="text-xl" />
                                <FaCaretDown className="group-hover:rotate-180 duration-300 text-sm" />
                            </button>
                            {/* Menú desplegable */}
                            <div className="absolute top-full right-0 z-10 hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white">
                                <ul className="space-y-2">
                                    <li>
                                        <button
                                            className="text-gray-500 dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold flex items-center gap-2"
                                            onClick={toggleLanguage}
                                        >
                                            <FaGlobe />
                                            Cambiar idioma ({language})
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="text-gray-500 dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold flex items-center gap-2"
                                            onClick={() =>
                                                alert("Cambiar moneda funcionalidad pendiente")
                                            }
                                        >
                                            <FaWallet />
                                            Cambiar moneda
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Dark Mode Section */}
                        <div>
                            <DarkMode />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
