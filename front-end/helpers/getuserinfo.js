const API = import.meta.env.VITE_REACT_APP_API || 'http://localhost:5000'
export const getUserInfo = async () => {
    try {
        const response = await fetch(`${API}/users/protegida`, {
            method: "GET",
            credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Error en la solicitud:", response.status);
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
};