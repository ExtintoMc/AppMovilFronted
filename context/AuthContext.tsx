import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, logoutRequest, registerRequest, verifyTokenRequest } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const TOKEN_KEY = 'userToken'

interface AuthProps {
    authState?: {
        token: string | null
        authenticated?: boolean | null
    },
    userState?: {
        id: string | null
        username: string | null
        rol: string | null
        email: string | null
        password: string | null
    },
    onRegister?: (
        username: string,
        email: string,
        password: string
    ) => Promise<any>
    onLogin?: (
        email: string,
        password: string
    ) => Promise<any>
    onLogout?: () => Promise<any>
    errors?: any
}

export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export const AuthProvider = ({ children }: any) => {

    const [authState, setAuthState] = useState<{
        token: string | null
        authenticated: boolean | null
    }>({
        token: null,
        authenticated: null,
    })

    const [userState, setUserState] = useState<{
        id: string | null
        username: string | null
        rol: string | null
        email: string | null
        password: string | null
    }>({
        id: null,
        username: null,
        rol: null,
        email: null,
        password: null
    })

    const register = async (username: string, email: string, password: string) => {
        try {
            const res = await registerRequest({ username, email, password });
            const token = res.data.token

            setAuthState({
                token: token,
                authenticated: true
            })

            setUserState({
                id: res.data.id,
                username: res.data.username,
                rol: res.data.rol,
                email: res.data.email,
                password: res.data.password
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            await AsyncStorage.setItem(TOKEN_KEY, token)

            return res.data
        } catch (error: any) {
            console.log(error.response.data)
        }
    }

    const login = async (email: string, password: string) => {
        try {

            const res = await loginRequest({ email, password })
            const token = res.data.token

            console.log('respuestaaaaa ', res.data)

            setAuthState({
                token: token,
                authenticated: true
            })

            setUserState({
                id: res.data.id,
                username: res.data.username,
                rol: res.data.rol,
                email: res.data.email,
                password: res.data.password
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            await AsyncStorage.setItem(TOKEN_KEY, token)

            return res.data
        } catch (error: any) {
            console.log(error.response.data)
        }
    }

    const verifyToken = async () => {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        try {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const res = await verifyTokenRequest(token);

                console.log(res.data);

                setAuthState({
                    token: token,
                    authenticated: true
                });

                setUserState({
                    id: res.data.id,
                    username: res.data.username,
                    rol: res.data.rol,
                    email: res.data.email,
                    password: res.data.password
                })

            } else {
                setAuthState({
                    token: null,
                    authenticated: false
                });
                setUserState({
                    id: null,
                    username: null,
                    rol: null,
                    email: null,
                    password: null
                })
            }
        } catch (error: any) {
            console.log('Error verifying token:', error);
            setAuthState({
                token: null,
                authenticated: false
            });
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem(TOKEN_KEY);
            const res = await logoutRequest()

            setAuthState({
                token: null,
                authenticated: false
            });

            setUserState({
                id: null,
                username: null,
                rol: null,
                email: null,
                password: null
            });

            delete axios.defaults.headers.common['Authorization'];

            return res.data

        } catch (error: any) {
            console.log('Error during logout:', error);
        }
    };

    useEffect(() => {
        verifyToken()
    }, [])


    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState: authState,
        userState: userState
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}