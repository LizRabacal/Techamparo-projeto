export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  // 💡 NOME E DESCRIÇÃO FOCADOS NO PROJETO
  name: "TechAmparo | Idade Digital",
  description: 
    "Plataforma de educação digital que conecta educadores a idosos, oferecendo conteúdo acessível, personalizado e oportunidades de remuneração para instrutores.",
  
  // 🔗 ITENS DE NAVEGAÇÃO PRINCIPAIS (Para o Público)
  navItems: [
    {
      label: "Início",
      href: "/",
    },
    {
      label: "Cursos", // Foco no público-alvo
      href: "/cursos",
    },
    {
      label: "Para Educadores", // Foco na remuneração/parceria
      href: "/educadores",
    },
    {
      label: "Como Funciona?",
      href: "/como-funciona",
    },
    {
      label: "Sobre Nós",
      href: "/sobre",
    },
  ],
  
  // 🗂️ ITENS DO MENU DE USUÁRIO (Acesso Rápido)
  // Adaptado para ter perfis de Educador e Aluno
  navMenuItems: [
    {
      label: "Meu Painel (Aluno)",
      href: "/dashboard-aluno",
    },
    {
      label: "Painel do Educador",
      href: "/dashboard-educador",
    },
    {
      label: "Minhas Aulas",
      href: "/minhas-aulas",
    },
    {
      label: "Ganhos e Pagamentos", // Importante para o educador
      href: "/pagamentos",
    },
    {
      label: "Configurações",
      href: "/configuracoes",
    },
    {
      label: "Ajuda",
      href: "/ajuda",
    },
    {
      label: "Sair",
      href: "/logout",
    },
  ],
  
  // 🌐 LINKS DE REDES SOCIAIS E DOCUMENTAÇÃO (Manter se aplicável)
  links: {
    github: "https://github.com/seus-repositorios/techamparo", // Atualizar com o seu repositório
    twitter: "https://twitter.com/sua-conta-tech", 
    docs: "/ajuda", // Mudei para uma rota interna
    discord: "https://discord.gg/comunidade-techamparo", 
    // Você pode remover ou manter links de patrocínio
    sponsor: "https://patreon.com/seu-patreon", 
  },
};