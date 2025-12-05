'use client'

import React, { useState, forwardRef } from "react";
import { Zap, BookOpen, DollarSign, Users, ArrowRight, ArrowDown } from 'lucide-react'; 

// --- DADOS MOCKADOS E CONFIGURAÇÃO ---

const COLORS = {
    primaryDark: "#1A4372",      // tech-marinho (Texto/Fundo Footer)
    primaryMedium: "#2C5DA0",    // tech-azul-medio (Títulos)
    accentBright: "#00C896",     // tech-verde-agua (Destaque Leve)
    accentDark: "#00A381",       // tech-esmeralda (CTAs)
    neutral: "#D9D9D9",          // tech-cinza-suave 
};

// --- COMPONENTES MOCKADOS (Garantindo a compilação) ---

//@ts-expect-error
const LocalForm = ({ children, className, onSubmit }) => (
  <form onSubmit={onSubmit} className={className}>
    {children}
  </form>
);

//@ts-expect-error
const LocalButton = ({ children, className, type, style, startContent, disabled, href }) => {
    let baseClasses = "rounded-full font-semibold px-8 py-3 transition-all duration-200 hover:opacity-90 active:scale-[0.98]";
    
    const buttonContent = (
      <>
        {startContent && <span className="mr-2">{startContent}</span>}
        {children}
      </>
    );

    if (href) {
        return (
            <a 
                href={href} 
                className={`${baseClasses} ${className} flex items-center justify-center`}
                style={{...style}}
            >
                {buttonContent}
            </a>
        );
    }
    
    return (
      <button 
        type={type} 
        disabled={disabled}
        className={`${baseClasses} ${className} flex items-center justify-center`}
        style={{...style, cursor: disabled ? 'not-allowed' : 'pointer'}}
      >
        {buttonContent}
      </button>
    );
};

//@ts-expect-error
const LocalInput = forwardRef(({ label,  isRequired, name, placeholder, type, startContent, disabled, multiline = false,
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

//@ts-expect-error
const LocalImage = ({ src, alt, width, height, className }) => (
    <img src={src} alt={alt} width={width} height={height} className={`object-cover ${className}`} style={{ minHeight: height, minWidth: width }}/>
);


// --- SEÇÕES DA LANDING PAGE ---

const HeroSection = () => (
    <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto py-16 lg:py-24 px-4 gap-12">
        
        {/* Lado Esquerdo: Texto e CTAs */}
        <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4" style={{ color: COLORS.primaryMedium }}>
                A Ponte para a <span style={{ color: COLORS.accentDark }}>Idade Digital</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
                Aprenda tecnologia de forma simples e personalizada, ou seja o mentor que transforma vidas e gera renda.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                                              {/* @ts-expect-error */}

                <LocalButton 
                    href="/cadastro"
                    startContent={<Zap size={20} />}
                    className="text-white text-lg shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: COLORS.accentDark }}
                >
                    Quero Aprender (Aluno)
                </LocalButton>
                                                {/* @ts-expect-error */}

                <LocalButton 
                    href="/cadastro"
                    startContent={<DollarSign size={20} />}
                    className="text-lg shadow-md border-2"
                    style={{ backgroundColor: COLORS.primaryDark, color: COLORS.accentBright }}
                >
                    Sou Educador (Renda)
                </LocalButton>
            </div>
        </div>

        {/* Lado Direito: Imagem */}
        <div className="lg:w-1/2 w-full flex justify-center">
            {/* Simulação da imagem na pasta public './idosos' */}
            <LocalImage
                src="./imagem1LP.jpg"
                alt="Idosos aprendendo tecnologia com auxílio de mentores"
                width={500}
                height={350}
                className="rounded-xl shadow-2xl border-4"
                //@ts-expect-error
                style={{borderColor: COLORS.accentBright}}
            />
        </div>
    </div>
);

const ValuePropositionSection = () => (
    <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12" style={{ color: COLORS.primaryMedium }}>
                Nossos Pilares
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
                
                {/* Pilar 1: Inclusão Acessível */}
                <div className="p-6 rounded-xl shadow-lg border" style={{borderColor: COLORS.neutral}}>
                    <BookOpen size={48} className="mx-auto mb-4" style={{color: COLORS.primaryMedium}} />
                    <h3 className="text-xl font-semibold mb-3" style={{color: COLORS.primaryDark}}>
                        Inclusão Digital Simplificada
                    </h3>
                    <p className="text-gray-600">
                        Conteúdo acessível e personalizado para as necessidades do público sênior. Sem jargões técnicos!
                    </p>
                </div>

                {/* Pilar 2: Renda para Educadores */}
                <div className="p-6 rounded-xl shadow-lg border" style={{borderColor: COLORS.neutral}}>
                    <DollarSign size={48} className="mx-auto mb-4" style={{color: COLORS.accentDark}} />
                    <h3 className="text-xl font-semibold mb-3" style={{color: COLORS.primaryDark}}>
                        Renda Extra com Propósito
                    </h3>
                    <p className="text-gray-600">
                        Maximize seus ganhos oferecendo seu conhecimento. Remuneração garantida por hora de mentoria.
                    </p>
                </div>

                {/* Pilar 3: Conexão de Gerações */}
                <div className="p-6 rounded-xl shadow-lg border" style={{borderColor: COLORS.neutral}}>
                    <Users size={48} className="mx-auto mb-4" style={{color: COLORS.accentBright}} />
                    <h3 className="text-xl font-semibold mb-3" style={{color: COLORS.primaryDark}}>
                        Conexão de Gerações
                    </h3>
                    <p className="text-gray-600">
                        Crie laços significativos, transmitindo competências essenciais para a vida moderna.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const HowItWorksSection = () => (
    <div className="py-16 md:py-24" style={{ backgroundColor: COLORS.neutral + '40' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12" style={{ color: COLORS.primaryMedium }}>
                Como Funciona?
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 text-left">
                
                {/* Fluxo do Aluno */}
                <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4" style={{borderColor: COLORS.accentDark}}>
                    <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: COLORS.accentDark }}>
                        <BookOpen className="mr-3" size={30} /> Para o Aluno (Idosos)
                    </h3>
                    <ol className="space-y-6 list-decimal pl-6 text-gray-700">
                        <li>
                            <span className="font-semibold" style={{color: COLORS.primaryDark}}>Solicite a Aula:</span> Preencha um formulário simples com o tópico que deseja aprender (WhatsApp, Email, etc.).
                        </li>
                        <li>
                            <span className="font-semibold" style={{color: COLORS.primaryDark}}>Receba um Mentor:</span> Nossa plataforma conecta você com o mentor mais adequado e disponível.
                        </li>
                        <li>
                            <span className="font-semibold" style={{color: COLORS.primaryDark}}>Aprenda no Seu Ritmo:</span> Comece suas aulas 100% personalizadas e domine a tecnologia sem pressa.
                        </li>
                    </ol>
                </div>

                {/* Fluxo do Educador */}
                <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4" style={{borderColor: COLORS.primaryMedium}}>
                    <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: COLORS.primaryMedium }}>
                        <DollarSign className="mr-3" size={30} /> Para o Educador (Mentor)
                    </h3>
                    <ol className="space-y-6 list-decimal pl-6 text-gray-700">
                        <li>
                            <span className="font-semibold" style={{color: COLORS.primaryDark}}>Cadastre-se:</span> Crie seu perfil detalhando suas áreas de especialidade (tecnologia básica, apps, etc.).
                        </li>
                        <li>
                            <span className="font-semibold" style={{color: COLORS.primaryDark}}>Aceite Solicitações:</span> Receba notificações de alunos próximos precisando de ajuda em seus tópicos.
                        </li>
                        <li>
                            <span className="font-semibold" style={{color: COLORS.primaryDark}}>Seja Remunerado:</span> Conclua a sessão de mentoria e receba o pagamento diretamente pela plataforma.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
);


export default function App() {

    return (
        <main className="min-h-screen bg-gray-50">
            <HeroSection />
            <ValuePropositionSection />
            <HowItWorksSection />

            {/* Seção CTA Final */}
            <div className="py-16 text-center" style={{ backgroundColor: COLORS.primaryMedium }}>
                <h2 className="text-3xl font-bold mb-4 text-white">
                    Pronto para Começar?
                </h2>
                <p className="text-xl mb-8" style={{ color: COLORS.neutral }}>
                    Seja aluno ou mentor, seu futuro digital começa agora.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                                  {/* @ts-expect-error */}
                     <LocalButton 
                        href="/cadastro"
                        startContent={<ArrowRight size={20} />}
                        className="text-white text-lg shadow-lg hover:shadow-xl"
                        style={{ backgroundColor: COLORS.accentDark }}
                    >
                        Comece Hoje
                    </LocalButton>
                </div>
            </div>
        </main>
    );
}