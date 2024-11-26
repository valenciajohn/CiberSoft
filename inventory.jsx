import React, { useState, useEffect } from 'react';
import { addItem, getItems, deleteItem, updateItem } from './services/itemServices';
import { useNavigate } from 'react-router-dom';  // Para redirección

const ProductList = () => {
    const [form, setForm] = useState({
        nameItem: '',
        descriptionItem: '',
        priceItem: '',
        quantityItem: '',
        typeItem: '', // Nuevo campo
    });
    const [image, setImage] = useState(null);
    const [items, setItems] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const navigate = useNavigate(); // Para manejar redirecciones

    useEffect(() => {
        verifyAccountType(); // Verificamos si es un vendedor al cargar
    }, []);

    const verifyAccountType = async () => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            alert('Por favor, inicia sesión para agregar productos.');
            navigate('/login');  // Redirige al login si no hay usuario
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token
            if (payload.accountType !== 'vendedor') {
                alert('Solo los vendedores pueden agregar productos. Si deseas vender, por favor, cambia tu tipo de cuenta.');
                navigate('/');  // Redirige a la página principal si no es vendedor
            } else {
                fetchItems(payload.userId); // Obtén los productos de este usuario
            }
        } catch (error) {
            console.error('Error verificando la cuenta del usuario:', error);
            alert('Hubo un error verificando la cuenta del usuario.');
        }
    };

    const fetchItems = async (userId) => {
        try {
            const data = await getItems(userId);
            setItems(data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();

        if (!image) {
            alert('Por favor selecciona una imagen.');
            return;
        }

        const formData = new FormData();
        formData.append('nameItem', form.nameItem);
        formData.append('descriptionItem', form.descriptionItem);
        formData.append('priceItem', form.priceItem);
        formData.append('quantityItem', form.quantityItem);
        formData.append('typeItem', form.typeItem); // Agrega el tipo de producto
        formData.append('image', image);

        try {
            const token = localStorage.getItem('jwt');
            await addItem(formData, token);
            fetchItems(); // Actualiza la lista de productos
            alert('Producto agregado con éxito.');
            setForm({ nameItem: '', descriptionItem: '', priceItem: '', quantityItem: '', typeItem: '' });
            setImage(null);
        } catch (error) {
            console.error('Error al agregar producto:', error);
            alert('Hubo un error al agregar el producto.');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nameItem', form.nameItem);
        formData.append('descriptionItem', form.descriptionItem);
        formData.append('priceItem', form.priceItem);
        formData.append('quantityItem', form.quantityItem);
        formData.append('typeItem', form.typeItem); // Agrega el tipo de producto
        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('jwt');
            await updateItem(editingItemId, formData, token);
            fetchItems(); // Actualiza la lista de productos
            alert('Producto actualizado con éxito.');
            setEditingItemId(null);
            setForm({ nameItem: '', descriptionItem: '', priceItem: '', quantityItem: '', typeItem: '' });
            setImage(null);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            alert('Hubo un error al actualizar el producto.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('jwt');
            await deleteItem(id, token);
            setItems(items.filter(item => item._id !== id)); // Actualiza la lista local de productos
            alert('Producto eliminado con éxito.');
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('Hubo un error al eliminar el producto.');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const startEditing = (item) => {
        setEditingItemId(item._id);
        setForm({
            nameItem: item.nameItem,
            descriptionItem: item.descriptionItem,
            priceItem: item.priceItem,
            quantityItem: item.quantityItem,
            typeItem: item.typeItem,
        });
        setImage(null);
    };

    return (
        <div>
            {/* Mantén el resto de la estructura igual */}
    
            <form onSubmit={editingItemId ? handleUpdate : handleAddItem} className='form-inventory'>
                <input name="nameItem" placeholder="Nombre del producto" value={form.nameItem} onChange={handleChange} required />
                <input name="descriptionItem" placeholder="Descripción" value={form.descriptionItem} onChange={handleChange} required />
                <input name="priceItem" placeholder="Precio" value={form.priceItem} onChange={handleChange} required />
                <input name="quantityItem" placeholder="Cantidad" value={form.quantityItem} onChange={handleChange} required />
                <select name="typeItem" value={form.typeItem} onChange={handleChange} required>
                    <option value="">Selecciona el tipo</option>
                    <option value="computadores">Computadores</option>
                    <option value="celulares">Celulares</option>
                    <option value="electrohogar">Electrohogar</option>
                    <option value="accesorios">Accesorios</option>
                    <option value="zona gamer">Zona Gamer</option>
                </select>
                <input type="file" onChange={handleImageChange} required />
                <button type="submit">{editingItemId ? "Actualizar producto" : "Agregar producto"}</button>
            </form>
    
            <div className="item-list">
                {items.map((item) => (
                    <div key={item._id} className="item-card">
                        <img 
                            src={item.image} 
                            alt={item.nameItem} 
                            className="item-image" 
                        />
                        <div className="item-info">
                            <h3>{item.nameItem}</h3>
                            <p>{item.descriptionItem}</p>
                            <p><strong>Precio:</strong> ${item.priceItem}</p>
                            <p><strong>Cantidad:</strong> {item.quantityItem}</p>
                            <p><strong>Tipo:</strong> {item.typeItem}</p>
                            <button onClick={() => startEditing(item)}>Editar</button>
                            <button onClick={() => handleDelete(item._id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
    
        </div>
    );
    
};

export default ProductList;
