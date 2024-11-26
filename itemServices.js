import axios from 'axios';

const API_URL = "http://localhost:5005/items";

// Obtener productos
export const getItems = async (userId) => {
    const token = localStorage.getItem('jwt');
    const response = await axios.get(`${API_URL}/items/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Agregar producto
export const addItem = async (formData, token) => {
    await axios.post(`${API_URL}/items`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });
};

// Actualizar producto
export const updateItem = async (id, formData, token) => {
    await axios.put(`${API_URL}/items/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });
};

// Eliminar producto
export const deleteItem = async (id, token) => {
    await axios.delete(`${API_URL}/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
