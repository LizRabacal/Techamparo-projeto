'use client'

import React, { useState, forwardRef } from "react";
import { BookOpen, Mail, Send, User, CheckCircle, Clock, XCircle, Zap } from 'lucide-react';

// --- DADOS MOCKADOS E CONFIGURAÇÃO ---

const COLORS = {
    primaryDark: "#1A4372",      // tech-marinho (Texto)
    primaryMedium: "#2C5DA0",    // tech-azul-medio (Títulos)
    accentBright: "#00C896",     // tech-verde-agua (Destaque/Ícones)
    accentDark: "#00A381",       // tech-esmeralda (CTAs)
    neutral: "#D9D9D9",          // tech-cinza-suave (Divisórias)
    warning: "#F59E0B",          // Amarelo para pendente
};

const MOCK_CLASSES = [
    { id: 1, title: 'Introdução ao WhatsApp', mentor: 'João Mentor', status: 'Em Curso', date: '2025-10-15', progress: 75, color: COLORS.accentDark, icon: Clock },
    { id: 2, title: 'Noções Básicas de Email', mentor: 'Joana Silva', status: 'Concluída', date: '2025-08-01', progress: 100, color: COLORS.primaryMedium, icon: CheckCircle },
    { id: 3, title: 'Segurança Online', mentor: 'Carlos Souza', status: 'Pendente', date: '2025-11-20', progress: 0, color: COLORS.warning, icon: XCircle },
];


// --- COMPONENTES MOCKADOS (Garantindo a compilação) ---
//@ts-expect-error
const LocalForm = ({ children, className, onSubmit }) => (
    <form onSubmit={onSubmit} className={className}>
        {children}
    </form>
);
//@ts-expect-error
const LocalButton = ({ children, className, type, style, startContent, disabled }) => {
    let baseClasses = "rounded-full font-semibold px-6 py-3 transition-all duration-200 hover:opacity-90 active:scale-[0.98]";

    return (
        <button
            type={type}
            disabled={disabled}
            className={`${baseClasses} ${className} flex items-center justify-center`}
            style={{ ...style, cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            {startContent && <span className="mr-2">{startContent}</span>}
            {children}
        </button>
    );
};

const LocalInput = forwardRef(({
    //@ts-expect-error
    label,
    //@ts-expect-error
    isRequired,
    //@ts-expect-error

    name,
    //@ts-expect-error

    placeholder,
    //@ts-expect-error

    type,
    //@ts-expect-error

    startContent,
    //@ts-expect-error

    disabled,
    //@ts-expect-error

    multiline = false,
    ...props
}, ref) => {
    const labelClasses = "text-gray-700 font-semibold";
    const inputOpacity = disabled ? 'opacity-60' : '';
    const InputElement = multiline ? 'textarea' : 'input';

    return (
        <div className={`flex flex-col gap-1 w-full ${inputOpacity}`}>
            <label className={`${labelClasses} text-sm`} style={{ color: COLORS.primaryDark }}>
                {label}
                {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative flex items-start border rounded-lg overflow-hidden bg-white">
                {startContent && <div className="pl-3 pt-3">{startContent}</div>}
                <InputElement
                    //@ts-expect-error

                    ref={ref}
                    name={name}
                    type={multiline ? undefined : type}
                    placeholder={placeholder}
                    required={isRequired}
                    disabled={disabled}
                    rows={multiline ? 4 : undefined}
                    className={`w-full p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[${COLORS.primaryMedium}] resize-none`}
                    style={{ paddingLeft: startContent ? '0.75rem' : '1rem' }}
                    {...props}
                />
            </div>
        </div>
    );
});
LocalInput.displayName = 'LocalInput';


// --- COMPONENTE PRINCIPAL (DASHBOARD) ---

export default function App() {
    const [requestStatus, setRequestStatus] = useState(null);
    const [isRequestLoading, setIsRequestLoading] = useState(false);

    //@ts-expect-error
    const handleRequestSubmit = (e) => {
        e.preventDefault();
        setIsRequestLoading(true);
        const formData = new FormData(e.currentTarget);
        const topic = formData.get('topic');

        // Simulação de chamada de rede
        setTimeout(() => {
            setIsRequestLoading(false);
            //@ts-expect-error
            setRequestStatus(`Solicitação para "${topic}" enviada com sucesso! Um educador responderá em breve.`);
        }, 2000);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 p-4 sm:p-8 gap-8">

            {/* Lado Esquerdo: Minhas Aulas */}
            <div className="w-full lg:w-2/3">
                <h1 className="text-4xl font-bold mb-6" style={{ color: COLORS.primaryDark }}>
                    Minhas Aulas
                </h1>
                <p className="text-gray-600 mb-8">
                    Acompanhe o progresso dos seus cursos e acesse materiais.
                </p>

                <div className="space-y-6">
                    {MOCK_CLASSES.map((aula) => (
                        <div
                            key={aula.id}
                            className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center border-l-4"
                            style={{ borderColor: aula.color }}
                        >
                            <div className="flex items-center mb-4 md:mb-0">
                                <aula.icon size={24} className="mr-4" style={{ color: aula.color }} />
                                <div>
                                    <h2 className="text-lg font-semibold" style={{ color: COLORS.primaryMedium }}>{aula.title}</h2>
                                    <p className="text-sm text-gray-500">Mentor: {aula.mentor}</p>
                                    <p className="text-xs text-gray-400">Início: {aula.date}</p>
                                </div>
                            </div>

                            <div className="w-full md:w-auto text-right">
                                <span className="text-sm font-bold block mb-2" style={{ color: aula.color }}>{aula.status}</span>

                                {aula.progress < 100 && (
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                                        <div
                                            style={{ width: `${aula.progress}%`, backgroundColor: aula.color }}
                                            className="h-full transition-all duration-500"
                                        ></div>
                                    </div>
                                )}
                                {/* @ts-expect-error */}
                                <LocalButton
                                    className="mt-3 text-sm px-4 py-1"
                                    style={{ backgroundColor: COLORS.primaryDark, color: 'white' }}
                                >
                                    {aula.status === 'Em Curso' ? 'Continuar' : 'Ver Detalhes'}
                                </LocalButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lado Direito: Solicitar Nova Aula */}
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-2xl sticky top-8 self-start border border-gray-100">
                <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.primaryMedium }}>
                    Solicitar Nova Aula
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                    Preencha o formulário para que um mentor te encontre.
                </p>

                <LocalForm onSubmit={handleRequestSubmit} className="flex flex-col gap-4">

                    {/* Tópico Desejado */}
                    <LocalInput
                        //@ts-expect-error
                        isRequired
                        label="Tópico de Interesse"
                        name="topic"
                        placeholder="Ex: Aprender a usar o Instagram"
                        type="text"
                        startContent={<BookOpen size={20} style={{ color: COLORS.primaryDark }} />}
                        disabled={isRequestLoading}
                    />

                    {/* Nível de Experiência */}
                    <LocalInput
                        //@ts-expect-error
                        isRequired
                        label="Seu Nível Atual"
                        name="level"
                        placeholder="Ex: Iniciante (Nunca usei)"
                        type="text"
                        startContent={<Zap size={20} style={{ color: COLORS.primaryDark }} />}
                        disabled={isRequestLoading}
                    />

                    {/* Descrição Adicional */}
                    <LocalInput
                        //@ts-expect-error

                        label="Detalhes da Solicitação"
                        name="details"
                        placeholder="O que exatamente você quer aprender?"
                        multiline={true}
                        disabled={isRequestLoading}
                    />

                    {/* Mensagem de Status */}
                    {requestStatus && (
                        <div className="p-3 rounded-lg border text-sm font-medium"
                            style={{ borderColor: COLORS.accentDark, backgroundColor: COLORS.accentBright + '10', color: COLORS.primaryDark }}>
                            {requestStatus}
                        </div>
                    )}

                    {/* Botão de Solicitação */}
                    <LocalButton
                        type="submit"
                        disabled={isRequestLoading}
                        startContent={isRequestLoading ?
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            : <Send size={20} />
                        }
                        className="w-full font-bold mt-2 text-md"
                        style={{
                            backgroundColor: COLORS.accentDark,
                            color: 'white'
                        }}
                    >
                        {isRequestLoading ? 'Enviando...' : 'Solicitar Aula'}
                    </LocalButton>
                </LocalForm>
            </div>

        </div>
    );
}