
import React from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-10">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <Icon name="TrendingUp" className="text-primary h-6 w-6" />
          <span className="font-bold text-xl">ТрейдерПро</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium hidden sm:inline-block">
            Демо-счет
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Дашборд
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Рынки
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Портфель
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              История
            </a>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <Icon name="Bell" size={18} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 font-normal hidden sm:flex">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://i.pravatar.cc/150?img=68" alt="Аватар пользователя" />
                    <AvatarFallback>ИТ</AvatarFallback>
                  </Avatar>
                  <span>Иван Трейдер</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon name="User" className="mr-2 h-4 w-4" />
                  <span>Профиль</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="Settings" className="mr-2 h-4 w-4" />
                  <span>Настройки</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="HelpCircle" className="mr-2 h-4 w-4" />
                  <span>Поддержка</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon name="LogOut" className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Мобильная кнопка меню */}
            <Button variant="outline" size="icon" className="sm:hidden">
              <Icon name="Menu" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
