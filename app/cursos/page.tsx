'use client'

import React, { useState, forwardRef } from "react";
import { BookOpen, DollarSign, Search, Filter, Zap, User, Clock, CheckCircle } from 'lucide-react';

// --- DADOS MOCKADOS E CONFIGURAÇÃO ---

const COLORS = {
  primaryDark: "#1A4372",      // tech-marinho (Texto/Fundo Footer)
  primaryMedium: "#2C5DA0",    // tech-azul-medio (Títulos)
  accentBright: "#00C896",     // tech-verde-agua (Destaque Leve)
  accentDark: "#00A381",       // tech-esmeralda (CTAs)
  neutral: "#D9D9D9",          // tech-cinza-suave 
};

const MOCK_COURSES = [
  { id: 1, title: 'WhatsApp para Iniciantes', mentor: 'João Mentor', level: 'Básico', duration: '4h', rating: 4.8, category: 'Comunicação', status: 'Em Destaque' },
  { id: 2, title: 'Segurança Online: Evite Fraudes', mentor: 'Maria Silva', level: 'Intermediário', duration: '6h', rating: 4.5, category: 'Segurança', status: 'Novo' },
  { id: 3, title: 'Email e Anexos Descomplicados', mentor: 'Carlos Souza', level: 'Básico', duration: '3h', rating: 4.9, category: 'Comunicação', status: 'Popular' },
  { id: 4, title: 'Primeiros Passos no YouTube', mentor: 'Ana Costa', level: 'Iniciante', duration: '2h', rating: 4.7, category: 'Entretenimento', status: 'Disponível' },
  { id: 5, title: 'Compras Online Seguras', mentor: 'Ricardo Melo', level: 'Intermediário', duration: '5h', rating: 4.6, category: 'Finanças Digitais', status: 'Disponível' },
];

const CATEGORIES = ['Comunicação', 'Segurança', 'Entretenimento', 'Finanças Digitais', 'Redes Sociais', 'Ferramentas Office'];
const LEVELS = ['Iniciante', 'Básico', 'Intermediário'];


// --- COMPONENTES MOCKADOS (Garantindo a compilação) ---

//@ts-expect-error
const LocalButton = ({ children, className, style, startContent, onClick }) => {
  let baseClasses = "rounded-full font-semibold px-4 py-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98] text-sm";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className} flex items-center justify-center`}
      style={{ ...style }}
    >
      {startContent && <span className="mr-2">{startContent}</span>}
      {children}
    </button>
  );
};
//@ts-expect-error
const LocalInput = forwardRef(({ placeholder, type, startContent, value, onChange, className,
  ...props
}, ref) => {

  return (
    <div className={`relative flex items-center border rounded-full overflow-hidden bg-white ${className}`}>
      {startContent && <div className="pl-3">{startContent}</div>}
      <input
        //@ts-expect-error
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[${COLORS.primaryMedium}]`}
        style={{ paddingLeft: startContent ? '0.5rem' : '1rem' }}
        {...props}
      />
    </div>
  );
});
LocalInput.displayName = 'LocalInput';


// --- COMPONENTE PRINCIPAL (PÁGINA DE CURSOS) ---

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  // Lógica de filtragem
  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.mentor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'Todos' || course.category === activeFilter || course.level === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // Função para renderizar o cartão do curso
  //@ts-expect-error
  const CourseCard = ({ course }) => {
    const accentColor = course.status === 'Em Destaque' ? COLORS.primaryMedium : COLORS.accentDark;

    return (
      <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4" style={{ borderColor: accentColor }}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold" style={{ color: COLORS.primaryDark }}>{course.title}</h3>
          <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: accentColor }}>
            {course.status}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          <User size={14} className="inline mr-1 align-sub" /> Mentor: {course.mentor}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
          <span className="flex items-center">
            <Zap size={14} className="mr-1" style={{ color: COLORS.primaryMedium }} /> Nível: {course.level}
          </span>
          <span className="flex items-center">
            <Clock size={14} className="mr-1" /> Duração: {course.duration}
          </span>
          <span className="flex items-center font-bold" style={{ color: COLORS.accentDark }}>
            {course.rating} <span className="ml-1 text-yellow-500">★</span>
          </span>
        </div>
        {/* @ts-expect-error */}
        <LocalButton
          className="w-full mt-3 text-white"
          style={{ backgroundColor: accentColor }}
        >
          Ver Detalhes e Matricular
        </LocalButton>
      </div>
    );
  };


  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: COLORS.primaryMedium }}>
          Catálogo de Aulas Digitais
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Encontre o mentor perfeito para dominar a tecnologia que você precisa.
        </p>

        {/* Área de Busca e Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center">

          {/* Busca */}
          <LocalInput
            //@ts-expect-error
            placeholder="Pesquisar por Título ou Mentor"
            type="search"
            value={searchTerm}
            //@ts-expect-error

            onChange={(e) => setSearchTerm(e.target.value)}
            startContent={<Search size={20} className="text-gray-400" />}
            className="w-full md:w-1/2"
          />

          {/* Botão de Filtro Mobile / Reset */}
          <LocalButton
            onClick={() => { setSearchTerm(''); setActiveFilter('Todos'); }}
            startContent={<Filter size={18} />}
            className="text-white md:hidden w-full"
            style={{ backgroundColor: COLORS.primaryDark }}
          >
            Limpar Filtros
          </LocalButton>
        </div>

        {/* Filtros e Conteúdo */}
        <div className="flex gap-8">

          {/* Sidebar de Filtros */}
          <aside className="hidden lg:block w-64 space-y-6 flex-shrink-0">

            <h3 className="text-xl font-bold" style={{ color: COLORS.primaryMedium }}>
              Categorias
            </h3>
            <div className="space-y-2">
              {['Todos', ...CATEGORIES].map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`block w-full text-left text-sm p-2 rounded-lg transition-colors ${activeFilter === category
                      ? 'font-semibold text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  style={{
                    backgroundColor: activeFilter === category ? COLORS.accentDark : 'transparent'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t" style={{ borderColor: COLORS.neutral }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.primaryMedium }}>
                Nível
              </h3>
              <div className="space-y-2">
                {LEVELS.map(level => (
                  <button
                    key={level}
                    onClick={() => setActiveFilter(level)}
                    className={`block w-full text-left text-sm p-2 rounded-lg transition-colors ${activeFilter === level
                        ? 'font-semibold text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    style={{
                      backgroundColor: activeFilter === level ? COLORS.accentDark : 'transparent'
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid de Cursos */}
          <section className="w-full lg:flex-1">
            {filteredCourses.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-white rounded-xl shadow-lg border" style={{ borderColor: COLORS.neutral }}>

                <Zap size={48} className="mx-auto mb-4" style={{
                  //@ts-expect-error
                  color: COLORS.warning
                }} />
                <h3 className="text-xl font-semibold" style={{ color: COLORS.primaryDark }}>Nenhum curso encontrado.</h3>
                <p className="text-gray-500 mt-2">Tente ajustar seus filtros ou termos de busca.</p>
                {/* @ts-expect-error */}
                <LocalButton
                  onClick={() => setActiveFilter('Todos')}
                  className="mt-6 text-white"
                  style={{ backgroundColor: COLORS.primaryMedium }}
                >
                  Mostrar Todos os Cursos
                </LocalButton>
              </div>
            )}
          </section>
        </div>

      </div>
    </main>
  );
}