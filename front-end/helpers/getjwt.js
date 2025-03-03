export const getTokenInfo = () => {
    try {
        const cookies = document.cookie.split('; '); // Separar cookies correctamente
        const tokenRow = cookies.find(row => row.startsWith('csrf_access_token='));

        if (!tokenRow) {
            console.warn("CSRF token not found in cookies.");
            return null;
        }

        const csrftoken = tokenRow.split('=')[1]?.trim(); // Eliminar espacios en blanco
        return csrftoken || null;
    } catch (error) {
        console.error("Error al obtener los datos del CSRF token:", error);
        return null;
    }
};
