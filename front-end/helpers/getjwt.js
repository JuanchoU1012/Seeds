

export const getTokenInfo = async () => {
    try {
        const csrftoken = document.cookie
        .split(';')
        .find(row => row.startsWith('csrf_access_token'))
        .split('=')[1];

        return csrftoken;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
};

