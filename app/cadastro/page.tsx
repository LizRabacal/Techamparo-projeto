'use client'
import React, { useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";
import { Button } from "@heroui/button";

import { User, BookOpen, Mail, Lock, Zap } from 'lucide-react'; // Ícones lucide-react

// --- PALETA DE CORES PERSONALIZADA ---
const COLORS = {
  primaryDark: "#1A4372",      // tech-marinho (Fundo Escuro/Texto)
  primaryMedium: "#2C5DA0",    // tech-azul-medio (Títulos)
  accentBright: "#00C896",     // tech-verde-agua (Destaque/Ícones)
  accentDark: "#00A381",       // tech-esmeralda (CTAs)
  neutral: "#D9D9D9",          // tech-cinza-suave (Divisórias)
};

export default function App() {
  const [userType, setUserType] = useState('aluno'); // Estado para 'aluno' ou 'educador'
  const [actionMessage, setActionMessage] = useState(null);

  //@ts-expect-error
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    
    // Limpar senha para exibição de segurança
    if (data.password) {
      data.password = '******';
    }
      //@ts-expect-error
    setActionMessage(`Cadastro de ${userType === 'aluno' ? 'Aluno' : 'Educador'} realizado com sucesso. Dados: ${JSON.stringify(data)}`);
  };

    //@ts-expect-error
  const RegistrationForm = ({ type }) => {
    return (
      <div className="flex flex-col gap-6 w-full">
        {/* Campo Comum: Nome Completo */}
        <Input
          isRequired
          label="Nome Completo"
          labelPlacement="outside"
          name="nome"
          placeholder="Seu nome"
          type="text"
          startContent={<User className="text-tech-marinho" size={20} style={{color: COLORS.primaryDark}} />}
          // Estilo para garantir a cor tech-marinho para os labels e textos
          classNames={{
            label: "text-tech-marinho font-semibold",
          }}
        />

        {/* Campo Comum: Email */}
        <Input
          isRequired
          errorMessage="Por favor, insira um email válido"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="seu@email.com"
          type="email"
          startContent={<Mail className="text-tech-marinho" size={20} style={{color: COLORS.primaryDark}} />}
          classNames={{
            label: "text-tech-marinho font-semibold",
          }}
        />

        {/* Campo Comum: Senha */}
        <Input
          isRequired
          errorMessage="A senha deve ter pelo menos 8 caracteres"
          label="Senha"
          labelPlacement="outside"
          name="password"
          placeholder="Mínimo 8 caracteres"
          type="password"
          startContent={<Lock className="text-tech-marinho" size={20} style={{color: COLORS.primaryDark}} />}
          classNames={{
            label: "text-tech-marinho font-semibold",
          }}
        />

        {/* --- CAMPOS ESPECÍFICOS --- */}
        {type === 'aluno' ? (
          // Campos para Aluno
          <Input
            isRequired
            label="Data de Nascimento"
            labelPlacement="outside"
            name="nascimento"
            placeholder="DD/MM/AAAA"
            type="date"
            classNames={{
              label: "text-tech-marinho font-semibold",
            }}
          />
        ) : (
          // Campos para Educador
          <>
            <Input
              isRequired
              label="Área de Especialização"
              labelPlacement="outside"
              name="especializacao"
              placeholder="Ex: Noções de Smartphone, Pacote Office"
              type="text"
              startContent={<BookOpen className="text-tech-marinho" size={20} style={{color: COLORS.primaryDark}} />}
              classNames={{
                label: "text-tech-marinho font-semibold",
              }}
            />
            <Input
              isRequired
              label="Bio Curta"
              labelPlacement="outside"
              name="bio"
              placeholder="Fale um pouco sobre sua experiência com idosos"
              type="text"
              classNames={{
                label: "text-tech-marinho font-semibold",
              }}
            />
            <Input
              label="Documento Comprobatório (Opcional)"
              labelPlacement="outside"
              name="documento"
              type="file"
              classNames={{
                label: "text-tech-marinho font-semibold",
              }}
            />
          </>
        )}
      </div>
    );
  };


  return (
    <div className="flex items-center justify-center min-h-screen rounded-3xl bg-black/10 p-4 sm:p-8">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-xl p-6 sm:p-10 border border-gray-100">
        
        <h1 
          className="text-3xl font-bold mb-1 text-center" 
          style={{ color: COLORS.primaryMedium }}
        >
          {userType === 'aluno' ? "Cadastro de Aluno" : "Cadastro de Educador"}
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Junte-se ao {userType === 'aluno' ? "futuro digital" : "nosso time de mentores"}
        </p>

        {/* Botões de Seleção de Tipo de Cadastro */}
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            onClick={() => setUserType('aluno')}
            // Aplica tech-esmeralda se selecionado, senão usa estilo flat
            style={{ 
              backgroundColor: userType === 'aluno' ? COLORS.accentDark : COLORS.neutral,
              color: userType === 'aluno' ? 'white' : COLORS.primaryDark 
            }}
            className="font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:opacity-80"
          >
            Sou Aluno
          </Button>
          <Button 
            onClick={() => setUserType('educador')}
            style={{ 
              backgroundColor: userType === 'educador' ? COLORS.accentDark : COLORS.neutral,
              color: userType === 'educador' ? 'white' : COLORS.primaryDark 
            }}
            className="font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:opacity-80"
          >
            Sou Educador
          </Button>
        </div>
        
        {/* Formulário Principal */}
        <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <RegistrationForm type={userType} />

          <Button 
            type="submit" 
            size="lg" 
            className="w-full font-bold mt-4 text-lg"
            // Cor de Destaque para o CTA final: tech-esmeralda
            style={{ 
              backgroundColor: COLORS.accentDark, 
              color: 'white' 
            }}
          >
            Cadastrar
          </Button>
        </Form>

        {/* Mensagem de Ação/Sucesso */}
        {actionMessage && (
          <div className="text-center mt-6 p-3 rounded-lg border" style={{ borderColor: COLORS.accentDark, backgroundColor: COLORS.accentBright + '10' }}>
            <code className="text-sm" style={{ color: COLORS.primaryDark }}>
              {actionMessage}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}