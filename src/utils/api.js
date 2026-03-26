
const BASE_URL = 'http://localhost:8080'; 

export const enviarDatos = async (endpoint, data) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al enviar los datos');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const eliminarDatos = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('No se pudo eliminar el registro');
        return response.status === 204 ? null : await response.json();
    } catch (error) {
        console.error('Error al eliminar:', error);
        throw error;
    }
};