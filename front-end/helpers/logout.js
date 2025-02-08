const API = import.meta.env.VITE_REACT_APP_API

export const logout = async () => {
    try {
        const response = await fetch(`${API}/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        if (response.ok) {
            window.location.href = '/';
        }
    }
    catch (error) {
        console.error(error);
    }
}