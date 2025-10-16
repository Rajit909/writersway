'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, LayoutGrid, FolderKanban, Shield } from 'lucide-react';

import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const mainNavLinks = [
  { href: '/', label: 'Home', icon: <LayoutGrid size={18} /> },
  { href: '/categories', label: 'Categories', icon: <FolderKanban size={18} /> },
];

const adminNavLink = { href: '/admin', label: 'Admin', icon: <Shield size={18} /> };

export function Header() {
  const pathname = usePathname();

  const renderLink = (link: { href: string; label: string; icon: React.ReactNode }, isMobile = false) => {
    const isActive = link.href === '/' ? pathname === link.href : pathname.startsWith(link.href);
    return (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
          isMobile && 'text-base w-full'
        )}
      >
        {link.icon}
        {link.label}
      </Link>
    );
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 ml-6">
          {mainNavLinks.map(link => renderLink(link))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
            <div className="hidden md:block">
                {renderLink(adminNavLink)}
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
                        {renderLink(adminNavLink, true)}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
