import './index.css';
import React, { useState, useEffect } from 'react';
import { getItemsPageMain } from './services/itemServices';
import Carrito from './shoppingCart';
import { efectoAgregarProducto } from './services/efectoCarrito';
import SignOut from './sign';
import Carousel from './Carousel';


const MyComponent = ({ addToCart }) => {
  const [items, setItems] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getItemsPageMain();
      setItems(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ul className='ul-inventory'>
        {items.map((item) => (
          <li key={item._id} className='item'>
            <h3 className='name-item'>{item.nameItem}</h3>
            <p className='description-item'>{item.descriptionItem}</p>
            <p className='price-item'>Precio: ${item.priceItem}</p>
            <p className='quantity-item'>Cantidad disponible: {item.quantityItem}</p>
            {item.image && <img src={item.image} alt={item.nameItem} width="200" style={{ marginBottom: '5%' }} className='img-item' />}
            <button style={{ marginBottom: '10%' }} onClick={() => {addToCart(item); efectoAgregarProducto()}}>
              Añadir al Carrito
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ComponentGamerStore() {
  const [carrito, setCarrito] = useState([]);

  // Función para añadir productos al carrito
  const addToCart = (item) => {
    setCarrito((prevCarrito) => {
      const itemExistente = prevCarrito.find((producto) => producto._id === item._id);
      if (itemExistente) {
        // Si el producto ya existe, aumentamos la cantidad
        return prevCarrito.map((producto) =>
          producto._id === item._id
            ? { ...producto, cantidad: producto.cantidad + 1 }
            : producto
        );
      } else {
        // Si el producto no existe, lo añadimos al carrito
        return [...prevCarrito, { ...item, cantidad: 1 }];
      }
    });
  };

  return (
    <div>
      <header className="header-container">
        <nav id="nav-container">
          <a href='/'>
            <img src="../public/images/CIBERTECH1.png" alt="Cibertech" className="image-logo" />
          </a>
          <div className='nav-middle'>
            <div className="div-products-container" id="container-in-header">
              <a href="#products" className="a-products">Productos</a>
            </div>
            <div className="div-about-us-container" id="container-in-header">
              <a href="#about-us" className="a-about-us">Acerca de nosotros</a>
            </div>
          </div>
          <SignOut/>
        </nav>
      </header>
      <main className="flex-grow">
        <section>
          <Carousel/>
        </section>
        <Carrito carrito={carrito} setCarrito={setCarrito} />
        <section className="products" id="products">
          <h1 className='title-inventory'>PRODUCTOS</h1>
          <MyComponent addToCart={addToCart} />
        </section>

        <section className="about-us" id="about-us">
          <div className="left-side">
            <img className="img-about-us" src="https://img.freepik.com/premium-photo/man-administrator-data-storage-information-technology-center-with-servers-generative-ai_118086-10656.jpg" alt="Floristeria1" />
            <img className="img-about-us" src="https://media.gq.com.mx/photos/5cbf8c609277d8857be23c04/16:9/w_1920,c_limit/GettyImages-956550532.jpg" alt="Floristeria2" />
            <img className="img-about-us" src="https://img.freepik.com/fotos-premium/escritorio-computadora-computadora-vista-futurista_833658-17.jpg" alt="floristeria3" />
            <img className="img-about-us" src="https://img.freepik.com/premium-photo/double-explosure-medical-technology-concept-working-remote-medicine-electronic-medical_662214-320316.jpg" alt="Floristeria4" />
            <img className="img-about-us" src="https://bysafeonline.com/wp-content/uploads/2023/01/digtial-business-2022-12-15-22-57-50-utc-1.jpg" alt="Floristeria5" />
          </div>
          <div className="right-side">
            <h1 className="title-about-us"> ¿QUIENES SOMOS?</h1>
            <p className="content-right">Cibertech es tu tienda en línea de tecnología de vanguardia. Ofrecemos computadoras, accesorios y equipos de gaming seleccionados por su calidad y rendimiento. Con productos innovadores y soluciones personalizadas, mejoramos tu experiencia tecnológica para trabajo y entretenimiento. ¡Visítanos y descubre lo último en tecnología!
            </p>
          </div>
        </section>


      </main>
      <footer className="relative bg-black bg-opacity-75 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            {/* Sección Cibertech */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">Cibertech</h3>
              <p className="text-gray-400">
                Innovación y tecnología en un solo lugar. Encuentra los mejores
                equipos y accesorios para tus necesidades tecnológicas.
              </p>
            </div>
            {/* Sección Enlaces Útiles */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Enlaces Útiles</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#nav-container"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Productos
                  </a>
                </li>
                <li>
                  <a
                    href="#about-us"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Sobre Nosotros
                  </a>
                </li>
              </ul>
            </div>
            {/* Sección Contacto */}
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <p className="text-gray-400">Email: contacto@cibershop.com</p>
              <p className="text-gray-400">Teléfono: +57 123 456 7890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 Cibershop. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
