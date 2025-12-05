'use client'
import React from "react";
import { Mail, Github, Twitter, Zap } from 'lucide-react'; 
import Image from "next/image";

// --- PALETA DE CORES PERSONALIZADA (Replicada da Configuração) ---
const COLORS = {
  primaryDark: "#1A4372",      // tech-marinho (Fundo Escuro/Texto)
  primaryMedium: "#2C5DA0",    // tech-azul-medio (Títulos)
  accentBright: "#00C896",     // tech-verde-agua (Destaque/Ícones)
  accentDark: "#00A381",       // tech-esmeralda (CTAs)
  neutral: "#D9D9D9",          // tech-cinza-suave (Divisórias)
};

// --- ESTRUTURA siteConfig (Replicada da Configuração de Navegação) ---
const siteConfig = {
  name: "TechAmparo | Idade Digital",
  navItems: [
    { label: "Início", href: "/" },
    { label: "Cursos Sênior", href: "/cursos" },
    { label: "Para Educadores", href: "/educadores" },
    { label: "Como Funciona?", href: "/como-funciona" },
    { label: "Sobre Nós", href: "/sobre" },
  ],
  links: {
    github: "https://github.com/seus-repositorios/techamparo",
    twitter: "https://twitter.com/sua-conta-tech",
    docs: "/ajuda",
    discord: "https://discord.gg/comunidade-techamparo",
  },
};


export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Estilo do Footer: Background escuro (tech-marinho) com texto claro
  const footerStyle = {
    backgroundColor: COLORS.primaryDark,
    color: 'white',
  };

  const linkStyle = {
    color: COLORS.neutral, // Cinza suave para links
    transition: 'color 0.2s',
  };

  const linkHoverStyle = {
    color: COLORS.accentBright, // Verde Água no hover
  };

  return (
    <footer style={footerStyle} className="w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Coluna 1: Marca e Slogan */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
                      <Image width={40} height={40} src={'/logo.png'} alt="logo" />
          
              <p className="font-bold text-xl" style={{ color: COLORS.accentBright }}>
                {siteConfig.name.split(' | ')[0]} 
              </p>
            </div>
            <p className="text-sm" style={linkStyle}>
              Conectando Gerações ao Conhecimento Digital.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" 
                 className="hover:opacity-75" style={linkStyle}><Twitter size={20} /></a>
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" 
                 className="hover:opacity-75" style={linkStyle}><Github size={20} /></a>
              <a href={`mailto:contato@techamparo.com`} 
                 className="hover:opacity-75" style={linkStyle}><Mail size={20} /></a>
            </div>
          </div>

          {/* Coluna 2: Navegação Principal */}
          <div>
            <h3 className="text-base font-semibold mb-4" style={{ color: COLORS.primaryMedium }}>
              Plataforma
            </h3>
            <ul className="space-y-3">
              {siteConfig.navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-sm hover:underline" 
                    style={linkStyle}
                    onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                    onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Recursos e Apoio */}
          <div>
            <h3 className="text-base font-semibold mb-4" style={{ color: COLORS.primaryMedium }}>
              Recursos
            </h3>
            <ul className="space-y-3">
              <li>
                <a href={siteConfig.links.docs} className="text-sm hover:underline" style={linkStyle}
                   onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                   onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}>
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="/termos" className="text-sm hover:underline" style={linkStyle}
                   onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                   onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}>
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="/privacidade" className="text-sm hover:underline" style={linkStyle}
                   onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                   onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}>
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/carreiras" className="text-sm hover:underline" style={linkStyle}
                   onMouseEnter={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                   onMouseLeave={(e) => e.currentTarget.style.color = linkStyle.color}>
                  Trabalhe Conosco
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contato Rápido / CTA */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base font-semibold mb-4" style={{ color: COLORS.primaryMedium }}>
              Fale Conosco
            </h3>
            <p className="text-sm mb-4" style={linkStyle}>
              Tem dúvidas ou quer ser um mentor?
            </p>
            <a 
              href="/contato" 
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full hover:opacity-90"
              style={{ backgroundColor: COLORS.accentDark, color: 'white' }}
            >
              Entre em Contato
            </a>
          </div>

        </div>

        {/* Linha de Copyright */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: COLORS.primaryMedium + '40' }}>
          <p className="text-center text-sm" style={linkStyle}>
            &copy; {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}