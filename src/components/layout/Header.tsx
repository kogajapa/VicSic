import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function Header({ title, showBackButton = false }: HeaderProps) {
  return (
    <header className="bg-sidebar border-b border-sidebar-border py-3 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar à Área do Psiquiatra</span>
            </Button>
          </Link>
        )}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className="text-primary">{title}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <input
            type="search"
            className="pl-10 pr-4 py-2 w-64 bg-muted border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Buscar..."
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-full">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 p-1 hover:bg-muted rounded-lg">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-sm text-left hidden md:block">
                <p className="font-medium">Dr. Ricardo Oliveira</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}