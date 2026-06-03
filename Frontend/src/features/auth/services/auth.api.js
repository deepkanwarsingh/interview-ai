import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function register({ username, email, password }) {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/register`,
            {
                username,
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function login({ email, password }) {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/login`,
            {
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function logout() {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/logout`,
            {},
            {
                withCredentials: true
            }
        );

        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export async function getMe() {
    try {
<<<<<<< HEAD
        const response = await axios.get(
            `${BASE_URL}/auth/get-me`,
            {
                withCredentials: true
            }
        );
=======
        const response = await axios.get("http://localhost:3000/api/auth/get-me", {
            withCredentials: true
        })
    } catch (err) {
        console.log(err)
    }
>>>>>>> 081c02dbf0d5d51a1bb0076c4db6f876252851f4

        return response.data;
    } catch (err) {
        console.log(err);
    }
}