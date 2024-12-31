'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserBalance, handleLogin, handleRegister } from '../lib/api';

const AuthContext = createContext<any>({}); // username

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<string | null>(null);
    async function loadUser() {
        const balance = await fetchUserBalance(user || ''); // when u change this to generic u can change setProperties
        setUserProperties({
            ...userProperties,
            balance: balance
        })
    }
    const [userProperties, setUserProperties] = useState({
        balance: 0
    })
    

    async function login(username: string, password: string) {
        const loginAccount = await handleLogin(username, password);
        if(loginAccount.success) {
            setUser(username);
            loadUser();
        } 
        return loginAccount;
    }
    async function register(username: string, password: string) {
            //console.log('PASSWORD')
            //console.log(form.password)
            const registerAccount = await handleRegister(username, password);
            if(registerAccount?.success) {
                setUser(username)
                loadUser();
            } 
            return registerAccount
    }
    const secretkey = 'nigga';
    return(
        <AuthContext.Provider value={{ user, userProperties, setUser, login, register, loadUser, secretkey }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);