import { getTokenInfo } from "./getjwt";

const token = await getTokenInfo();
const API = import.meta.env.VITE_REACT_APP_API

export const logout = async () => {
    try {
        const response = await fetch(`${API}/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "X-CSRF-TOKEN": token
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