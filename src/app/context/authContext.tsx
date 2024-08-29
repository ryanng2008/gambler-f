'use client'
import { createContext, useState } from 'react';

const AuthContext = createContext<any>({}); // username

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<string | null>(null);
    const secretkey = 'nigga';
    return(
        <AuthContext.Provider value={{ user, setUser, secretkey }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext