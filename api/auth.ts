import axios from './axios'

interface User {
    id?: string;
    username?: string;
    email?: string;
    password: string;
}

export const registerRequest = (user: User) => axios.post('/register', user)

export const loginRequest = (user: User) => axios.post('/login', user)

export const logoutRequest = () => axios.post('/logout')


export const verifyTokenRequest = (token?: string) => {
    return axios.get('/verify', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};