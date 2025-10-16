'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, LayoutGrid, FolderKanban, Shield, Mail, Info } from 'lucide-react';

import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from './ThemeToggle';

const mainNavLinks = [
  { href: '/', label: 'Home', icon: <LayoutGrid size={18} /> },
  { href: '/categories', label: 'Categories', icon: <FolderKanban size={18} /> },
  { href: '/about', label: 'About', icon: <Info size={18} /> },
  { href: '/contact', label: 'Contact', icon: <Mail size={18} /> },
];

const adminNavLink = { href: '/admin', label: 'Admin', icon: <Shield size={18} /> };

export function Header() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const renderLink = (link: { href: string; label: string; icon: React.ReactNode }, isMobile = false) => {
    const isActive = link.href === '/' ? pathname === link.href : pathname.startsWith(link.href);
    return (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
           isActive
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground',
          isMobile && 'text-base w-full'
        )}
      >
        {!isMobile && link.icon}
        {link.label}
      </Link>
    );
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 ml-6">
          {mainNavLinks.map(link => renderLink(link))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
            <ThemeToggle />
            <div className="hidden md:block">
                <Button variant="ghost" asChild>
                    {renderLink(adminNavLink)}
                </Button>
            </div>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="p-4">
                        <Logo />
                    </div>
                    <div className="grid gap-4 p-4">
                        {mainNavLinks.map(link => renderLink(link, true))}
                        <div className="border-t pt-4 mt-4">
                             {renderLink(adminNavLink, true)}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
