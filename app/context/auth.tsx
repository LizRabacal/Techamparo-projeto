'use client'

import React, { createContext, useContext, useState } from 'react';

// --- DADOS MOCKADOS E FAKE API (Replicados do LoginPage) ---
const MOCK_USERS = [
    { email: 'aluno@techamparo.com', password: 'aluno123', role: 'aluno', name: 'Maria da Silva (Aluno)', avatar: 'https://placehold.co/40x40/2C5DA0/FFFFFF?text=A' },
    { email: 'educador@techamparo.com', password: 'educador123', role: 'educador', name: 'João Mentor (Educador)', avatar: 'https://placehold.co/40x40/00C896/FFFFFF?text=E' },
];

const fakeLoginApi = ({ email, password }: { email: any, password: any }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = MOCK_USERS.find(u => u.email === email && u.password === password);
            if (user) {
                resolve({ success: true, user });
            } else {
                reject({ success: false, message: 'Email ou palavra-passe inválidos.' });
            }
        }, 1500); 
    });
};

// --- Tipagem do Contexto ---
interface User {
    email: string;
    name: string;
    role: 'aluno' | 'educador';
    avatar: string;
}

interface AuthContextType {
    currentUser: User | null;
    login: (credentials: { email: string, password: string }) => Promise<User>;
    logout: () => void;
    setCurrentUser: any,
    isLoading: boolean;
    isError: boolean;
    error: string | null;
}

// Criação do Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

// Provedor do Contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (credentials: { email: string, password: string }): Promise<User> => {
        setIsLoading(true);
        setIsError(false);
        setError(null);
        
        try {
            const result = await fakeLoginApi(credentials);
            // @ts-expect-error
            setCurrentUser(result.user); 
            setIsLoading(false);
            // @ts-expect-error
            return result.user;
        } catch (err) {
            setIsLoading(false);
            setIsError(true);
            // @ts-expect-error
            setError(err.message);
            // Rejeita a promessa para que o componente chamador possa capturar o erro
            // @ts-expect-error
            throw new Error(err.message || 'Falha ao logar.');
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setError(null);
    };

    const value = {
        currentUser,
        login,
        logout,
        isLoading,
        isError,
        error
    };
//@ts-expect-error
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// MOCK useMutation (Simula o hook do TanStack Query usando a lógica do Contexto)
// Este mock é usado no LoginPage para manter a sintaxe original.
// @ts-ignore
export const useFakeLoginMutation = (onSuccess: (user: User) => void) => {
    const auth = useAuth();
    
    const mutate = async (variables: { email: string, password: string }) => {
        try {
            const user = await auth.login(variables);
            onSuccess(user);
        } catch (e) {
            // O erro é tratado dentro do contexto
        }
    };

    return { 
        mutate, 
        isLoading: auth.isLoading, 
        isError: auth.isError, 
        error: auth.error, 
        isSuccess: !!auth.currentUser && !auth.isLoading && !auth.isError, 
        data: auth.currentUser 
    };
};