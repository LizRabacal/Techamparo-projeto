'use client'

import React, { useState, forwardRef } from "react";
import { BookOpen, User, CheckCircle, Clock, XCircle, DollarSign, List, Heart, Send } from 'lucide-react';

// --- DADOS MOCKADOS E CONFIGURAÇÃO ---

const COLORS = {
    primaryDark: "#1A4372",      // tech-marinho (Texto)
    primaryMedium: "#2C5DA0",    // tech-azul-medio (Títulos)
    accentBright: "#00C896",     // tech-verde-agua (Destaque/Ícones)
    accentDark: "#00A381",       // tech-esmeralda (CTAs - Aceitar)
    neutral: "#D9D9D9",          // tech-cinza-suave (Divisórias)
    warning: "#F59E0B",          // Amarelo para Pendente/Aviso
    danger: "#EF4444",           // Vermelho para Rejeitar
};

const MOCK_ACTIVE_CLASSES = [
    { id: 101, title: 'Introdução ao WhatsApp', student: 'Maria da Silva', status: 'Em Curso', nextLesson: 'Segunda, 10h', progress: 75, color: COLORS.accentDark, icon: Clock },
    { id: 102, title: 'Noções Básicas de Email', student: 'Antônio Souza', status: 'Em Curso', nextLesson: 'Quarta, 14h', progress: 30, color: COLORS.primaryMedium, icon: Clock },
];

const MOCK_COMPLETED_CLASSES = [
    { id: 201, title: 'Primeiros Passos no Google', student: 'Joana Mentorada', date: '2025-07-20', earnings: 150, color: COLORS.primaryDark, icon: CheckCircle },
];

const MOCK_REQUESTS = [
    { id: 301, student: 'José Alberto', topic: 'Configurar a TV Smart para o YouTube', level: 'Iniciante (Nunca usou)', budget: 'R$ 50-75/h' },
    { id: 302, student: 'Carmem Lúcia', topic: 'Aprender a usar o Instagram', level: 'Básico (Conhece pouco)', budget: 'R$ 75-100/h' },
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

//@ts-expect-error
const LocalInput = forwardRef(({ label, isRequired, name, placeholder, type, startContent, disabled, multiline = false,
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
    const [activeRequests, setActiveRequests] = useState(MOCK_REQUESTS);
    const [mentorStatus, setMentorStatus] = useState(null);
    const [isAccepting, setIsAccepting] = useState(false);

    //@ts-expect-error
    const handleAcceptRequest = (requestId) => {
        setIsAccepting(true);
        const acceptedRequest = activeRequests.find(req => req.id === requestId);

        // Simulação de chamada de rede (Aceitar)
        setTimeout(() => {
            setIsAccepting(false);
            setActiveRequests(prev => prev.filter(req => req.id !== requestId));
            //@ts-expect-error
            setMentorStatus(`Solicitação de ${acceptedRequest.student} (${acceptedRequest.topic}) foi aceita!`);
        }, 1500);
    };
    //@ts-expect-error

    const handleRejectRequest = (requestId) => {
        const rejectedRequest = activeRequests.find(req => req.id === requestId);
        setActiveRequests(prev => prev.filter(req => req.id !== requestId));
        //@ts-expect-error
        setMentorStatus(`Solicitação de ${rejectedRequest.student} rejeitada.`);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 p-4 sm:p-8 gap-8">

            {/* Lado Esquerdo: Aulas Ativas e Histórico */}
            <div className="w-full lg:w-2/3">
                <h1 className="text-4xl font-bold mb-2" style={{ color: COLORS.primaryDark }}>
                    Portal do Educador
                </h1>
                <p className="text-gray-600 mb-8">
                    Gerencie suas aulas e maximize seus ganhos com TechAmparo.
                </p>

                {/* Bloco 1: Aulas Ativas */}
                <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.primaryMedium }}>
                    <Clock size={24} className="inline mr-2 align-top" /> Minhas Aulas Ativas
                </h2>
                <div className="space-y-4 mb-10">
                    {MOCK_ACTIVE_CLASSES.map((aula) => (
                        <div
                            key={aula.id}
                            className="bg-white p-5 rounded-xl shadow-lg flex justify-between items-center border-l-4"
                            style={{ borderColor: aula.color }}
                        >
                            <div>
                                <h3 className="text-lg font-semibold" style={{ color: COLORS.primaryDark }}>{aula.title}</h3>
                                <p className="text-sm text-gray-500">Aluno: {aula.student}</p>
                                <p className="text-xs font-medium" style={{ color: COLORS.accentDark }}>Próxima: {aula.nextLesson}</p>
                            </div>

                            <div className="w-32 text-right">
                                <span className="text-xs text-gray-400 block mb-1">Progresso: {aula.progress}%</span>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        style={{ width: `${aula.progress}%`, backgroundColor: aula.color }}
                                        className="h-full transition-all duration-500"
                                    ></div>
                                </div>
                                {/*@ts-expect-error*/}
                                <LocalButton
                                    className="mt-3 text-sm px-4 py-1"
                                    style={{ backgroundColor: COLORS.primaryDark, color: 'white' }}
                                >
                                    Abrir Aula
                                </LocalButton>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bloco 2: Histórico de Ganhos */}
                <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.primaryMedium }}>
                    <DollarSign size={24} className="inline mr-2 align-top" /> Histórico de Ganhos
                </h2>
                <div className="space-y-4">
                    {MOCK_COMPLETED_CLASSES.map((aula) => (
                        <div
                            key={aula.id}
                            className="bg-white p-5 rounded-xl shadow-lg flex justify-between items-center border-l-4"
                            style={{ borderColor: aula.color }}
                        >
                            <div className="flex items-center">
                                <CheckCircle size={24} className="mr-4" style={{ color: aula.color }} />
                                <div>
                                    <h3 className="text-lg font-semibold" style={{ color: COLORS.primaryDark }}>{aula.title}</h3>
                                    <p className="text-sm text-gray-500">Aluno: {aula.student}</p>
                                    <p className="text-xs text-gray-400">Concluído em: {aula.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-xl font-bold block" style={{ color: COLORS.accentDark }}>+ R${aula.earnings},00</span>
                                <span className="text-xs text-gray-500">Valor Bruto</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lado Direito: Novas Solicitações de Aula */}
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-2xl sticky top-8 self-start border border-gray-100">
                <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.primaryMedium }}>
                    Novas Solicitações
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                    Confira os pedidos de alunos próximos e aceite para iniciar uma aula.
                </p>

                {mentorStatus && (
                    <div className="p-3 rounded-lg border text-sm font-medium mb-4"
                        style={{ borderColor: COLORS.accentDark, backgroundColor: COLORS.accentBright + '10', color: COLORS.primaryDark }}>
                        {mentorStatus}
                    </div>
                )}

                <div className="space-y-4">
                    {activeRequests.length > 0 ? (
                        activeRequests.map((req) => (
                            <div key={req.id} className="border p-4 rounded-lg" style={{ borderColor: COLORS.neutral }}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold" style={{ color: COLORS.primaryMedium }}>{req.student}</span>
                                    <span className="text-xs font-semibold" style={{ color: COLORS.accentDark }}>{req.budget}</span>
                                </div>
                                <p className="text-sm font-medium mb-2">{req.topic}</p>
                                <p className="text-xs text-gray-500">Nível Solicitado: {req.level}</p>

                                <div className="flex gap-2 mt-4">
                                    <LocalButton
                                        //@ts-expect-error
                                        onClick={() => handleAcceptRequest(req.id)}
                                        disabled={isAccepting}
                                        startContent={isAccepting ?
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            : <CheckCircle size={16} />
                                        }
                                        className="w-full py-1 text-sm"
                                        style={{ backgroundColor: COLORS.accentDark, color: 'white' }}
                                    >
                                        Aceitar
                                    </LocalButton>
                                    <LocalButton
                                        //@ts-expect-error

                                        onClick={() => handleRejectRequest(req.id)}
                                        className="w-full py-1 text-sm"
                                        style={{ backgroundColor: COLORS.danger, color: 'white' }}
                                    >
                                        Rejeitar
                                    </LocalButton>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 p-4 border rounded-lg" style={{ borderColor: COLORS.neutral }}>
                            Nenhuma nova solicitação no momento.
                        </p>
                    )}
                </div>
            </div>

        </div>
    );
}
