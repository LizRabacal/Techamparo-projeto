
'use client'
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Divider } from "@heroui/divider";

import { siteConfig } from "@/config/site";
import { Avatar } from "@heroui/avatar";

import Image from "next/image";
import { SearchIcon } from "./icons";
import { useAuth } from "@/app/context/auth";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";

export const Navbar = () => {
  const { currentUser } = useAuth();
  const displayMenu = [
    { label: "Meu Painel", href: "/portal-do-aluno", icon: <LayoutDashboard /> }, // Caminho Atualizado
    { label: "Meu Perfil", href: "/profile", icon: <User /> },
    { label: "Configurações", href: "/settings", icon: <Settings /> },
  ]

  const searchInput = (
    <Input
      aria-label="Search"
      className="w-full"
      classNames={{
        inputWrapper: "bg-default-100 w-full",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Pesquise por qualquer coisa"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="shadow-md  bg-white" classNames={{
      wrapper: "px-4 py-4 max-w-[80%]",
    }}>
      <NavbarContent className="basis-1/5 sm:basis-full w-full px-20" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit mr-10">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image width={40} height={40} src={'/logo.png'} alt="logo" />
            <p className="font-bold text-tech-esmeralda">TechAmparo</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium dark:text-shadow-tech-cinza-suave text-tech-azul-medio font-base",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
      <Divider className="max-h-14" orientation="vertical" />

      {searchInput}

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-3 h-8 justify-center items-center">
          {currentUser ?
            <Popover placement="bottom">
              <PopoverTrigger>
                {/* Simulação do Avatar, que está no componente LocalAvatar no seu Canvas */}
                <Avatar
                  src={currentUser?.avatar}
                  name={currentUser?.name}
                  className="cursor-pointer border-2 w-10 h-10"
                />
              </PopoverTrigger>
              <PopoverContent>
                {/* Divisor de Informações do Usuário */}
                <div className="p-2" >
                  <div className="flex items-center mb-2">
                    {/* Repetindo o Avatar aqui para um visual de desktop menu, ou apenas nome */}
                    <Avatar src={currentUser?.avatar} name={currentUser?.name} className="mr-3 w-8 h-8" />
                    <div>
                      <p className="font-bold text-base text-tech-azul-medio">{currentUser.name}</p>
                      <p className="text-xs text-gray-500">{currentUser.role === 'aluno' ? 'Aluno' : 'Educador Mentor'}</p>
                    </div>
                  </div>
                </div>

                {/* Opções de Navegação (Meu Painel, Perfil, Configurações) */}
                <div className="py-0 w-full flex flex-col justify-start">
                  {/* Usando displayMenu do seu Canvas, que mapeia MOCK_NAV_MENU */}
                  {displayMenu.map((item, index) => (
                    // Substitua Link/a e use as cores do seu tema
                    <a
                      key={index}
                      href={item.href}
                      className="px-4 py-2 flex text-tech-marinho items-center text-sm hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  ))}
                </div>

                {/* Botão de Logout */}
                <div className="p-2 ">
                  <Button
                    startContent={<LogOut size={16} />}
                    className="w-full bg-tech-azul-medio text-white font-semibold"
                    variant="flat"
                  >
                    Sair da Conta
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            : (
              <>
                <Button
                  as={Link}
                  className="text-sm text-white bg-tech-verde-agua font-semibold"
                  href={'/login'}
                  variant="flat"
                >
                  Login
                </Button>
                <Divider className="min-h-6" orientation="vertical" />

                <Button

                  as={Link}
                  className="text-sm text-tech-cinza-suave bg-tech-marinho font-semibold"
                  href={'/cadastro'}
                  variant="flat"
                >
                  Cadastro
                </Button>
              </>
            )

          }
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="!text-tech-azul-medio"
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
