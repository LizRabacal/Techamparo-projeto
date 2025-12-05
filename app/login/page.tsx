'use client'

import React, { useEffect } from "react";
// Importações do HeroUI (mantidas para o estilo do seu projeto)
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
// Importação do Contexto
import { useAuth, useFakeLoginMutation } from '../context/auth'; // Ajuste o caminho conforme necessário
import { useRouter } from "next/navigation";

// --- PALETA DE CORES PERSONALIZADA ---
const COLORS = {
    primaryDark: "#1A4372",      // tech-marinho (Fundo Escuro/Texto)
    primaryMedium: "#2C5DA0",    // tech-azul-medio (Títulos)
    accentBright: "#00C896",     // tech-verde-agua (Destaque/Ícones)
    accentDark: "#00A381",       // tech-esmeralda (CTAs)
    neutral: "#D9D9D9",          // tech-cinza-suave (Divisórias)
};

// --- FUNÇÃO DE REDIRECIONAMENTO ---


export default function LoginPage() {
    const router = useRouter()
    const redirectToPortal = (user: any) => {    
        if (!user) return;
    
        const role = user.role;
        let path = '/';
    
        if (role === 'aluno') {
            path = '/portal-do-aluno';
        } else if (role === 'educador') {
            path = '/portal-do-mentor';
        }
    
        console.log(`Redirecionando para: ${path}`);
        router.push(path) // Redirecionamento direto
    };
    const { currentUser, setCurrentUser } = useAuth();

    // A lógica de redirecionamento foi movida para esta função de sucesso da mutação.
    const { mutate: loginMutate, isLoading, isError, error, isSuccess } = useFakeLoginMutation(
        (user) => {
            setCurrentUser(user);
            // REDIRECIONAMENTO IMEDIATO APÓS ATUALIZAR O CONTEXTO
            redirectToPortal(user); 
        }
    );

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        // Dispara a mutação do login
        //@ts-expect-error
        loginMutate({ email, password });
    };

    // REMOVEMOS A FUNÇÃO handleContinue e a tela de sucesso.
    // O redirecionamento agora é feito dentro do useFakeLoginMutation.

    const iconColor = COLORS.primaryDark;

    // Se o usuário JÁ estiver logado ao entrar na página (p. ex., recarregou), 
    // redirecionamos via useEffect para evitar exibir o formulário por um instante.
    useEffect(() => {
        if (currentUser) {
            redirectToPortal(currentUser);
        }
    }, [currentUser]); // Dependência em currentUser

    // Se o usuário estiver logado ou o login estiver processando, não exibimos o formulário.
    // Com o useEffect acima, esta parte só será alcançada se currentUser for null/undefined.

    return (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 rounded-3xl bg-black/10">
            <div className="w-full max-w-sm bg-white shadow-2xl rounded-xl p-6 sm:p-8 border border-gray-100">

                <h1
                    className="text-3xl font-bold mb-2 text-center"
                    style={{ color: COLORS.primaryMedium }}
                >
                    Acesso TechAmparo
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Entre na sua conta para aceder aos cursos.
                </p>

                {/* Formulário de Login */}
                <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">

                    {/* Campo: Email */}
                    <Input
                        isRequired
                        label="Email"
                        labelPlacement="outside"
                        name="email"
                        placeholder="Seu email de cadastro"
                        type="email"
                        startContent={<Mail size={20} style={{ color: iconColor }} />}
                        classNames={{
                            label: "font-semibold",
                        }}
                        style={{ color: COLORS.primaryDark }}
                        disabled={isLoading}
                    />

                    {/* Campo: Palavra-passe */}
                    <Input
                        isRequired
                        label="Palavra-passe"
                        labelPlacement="outside"
                        name="password"
                        placeholder="Sua palavra-passe"
                        type="password"
                        startContent={<Lock size={20} style={{ color: iconColor }} />}
                        classNames={{
                            label: "font-semibold",
                        }}
                        style={{ color: COLORS.primaryDark }}
                        disabled={isLoading}
                    />

                    {/* Mensagem de Erro (TanStack Query Error State) */}
                    {isError && (
                        <div className="p-3 rounded-lg border border-red-500 bg-red-50 text-red-700 text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    {/* Opção Esqueceu a Palavra-passe */}
                    <div className="text-right -mt-2">
                        <a href="/recuperar-senha" className="text-sm font-medium" style={{ color: COLORS.primaryMedium }}>
                            Esqueceu a palavra-passe?
                        </a>
                    </div>

                    {/* Botão de Login (Loading State) */}
                    <Button
                        type="submit"
                        size="lg"
                        isDisabled={isLoading}
                        startContent={isLoading ?
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            : <LogIn size={20} />
                        }
                        className="w-full font-bold mt-4 text-lg flex items-center justify-center gap-2"
                        style={{
                            backgroundColor: COLORS.accentDark,
                            color: 'white'
                        }}
                    >
                        {isLoading ? 'A entrar...' : 'Entrar'}
                    </Button>

                    {/* Link para Cadastro */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Não tem conta?
                        <a href="/cadastro" className="font-semibold ml-1" style={{ color: COLORS.accentDark }}>
                            Registe-se aqui.
                        </a>
                    </p>

                </Form>
            </div>
        </div>
    );
}