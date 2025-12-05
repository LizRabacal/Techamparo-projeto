import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'tech-marinho': '#1A4372', // Azul Marinho Escuro (Texto principal, fundos escuros)
        'tech-azul-medio': '#2C5DA0',  // Azul Médio (Títulos e marca principal)
        
        // Cores de Destaque e Ação (Energia e Inclusão)
        'tech-verde-agua': '#00C896', // Verde Água Brilhante (Ícones, setas de progresso)
        'tech-esmeralda': '#00A381',  // Verde Esmeralda (Botões de Ação - CTAs)
        
        // Cores Neutras (Legibilidade e Base)
        'tech-cinza-suave': '#D9D9D9', // Cinza Suave (Texto de apoio, divisórias)
        // O branco (#FFFFFF) já é padrão no Tailwind, mas pode ser adicionado se necessário
      },
      // FONTES
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;