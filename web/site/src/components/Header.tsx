import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useView } from '@/contexts/ViewContext';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { viewMode, toggleView } = useView();

  const allNavItems = [
    { name: 'Inicio', path: '/', showInKids: true, showInAdvanced: true },
    { name: 'Base de Datos', path: '/database', showInKids: false, showInAdvanced: true },
    { name: 'Carga', path: '/upload', showInKids: false, showInAdvanced: true },
    { name: 'Entrenamiento', path: '/training', showInKids: false, showInAdvanced: true },
    { name: 'Estadísticas', path: '/statistics', showInKids: true, showInAdvanced: true },
  ];

  const navItems = allNavItems.filter(item => 
    viewMode === 'kids' ? item.showInKids : item.showInAdvanced
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold glow-text">Exoplanetas</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="view-mode-toggle" className="text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 inline-block mr-1" />
                Niños
              </Label>
              <Switch
                id="view-mode-toggle"
                checked={viewMode === 'advanced'}
                onCheckedChange={toggleView}
                aria-label="Toggle view mode"
              />
              <Label htmlFor="view-mode-toggle" className="text-sm font-medium text-muted-foreground">
                <GraduationCap className="h-4 w-4 inline-block mr-1" />
                Especializada
              </Label>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant={viewMode === 'kids' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                toggleView();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 mt-4"
            >
              <GraduationCap className="h-4 w-4" />
              <span>{viewMode === 'kids' ? 'Vista Niños' : 'Vista Especializada'}</span>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
