export const getTokenInfo = async () => {
    try {
        const tokenRow = document.cookie
            .split(';')
            .find(row => row.startsWith('csrf_access_token'));

        if (!tokenRow) {
            console.error("CSRF token not found in cookies.");
            return null; // or handle it as needed
        }

        const csrftoken = tokenRow.split('=')[1];
        return csrftoken;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
};