import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { LayoutGrid, FolderKanban, Home } from 'lucide-react';

const navLinks = [
    { href: '/admin', label: 'Posts', icon: <LayoutGrid size={18} /> },
    { href: '/admin/categories', label: 'Categories', icon: <FolderKanban size={18} /> },
];


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full flex">
      <aside className="w-64 flex-shrink-0 border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <Logo />
        </div>
        <nav className="flex-grow p-4 space-y-2">
            {navLinks.map(link => (
                <Link key={link.href} href={link.href}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        {link.icon}
                        {link.label}
                    </Button>
                </Link>
            ))}
        </nav>
        <div className="p-4 border-t">
             <Link href="/">
                <Button variant="outline" className="w-full justify-start gap-2">
                    <Home size={18} />
                    Back to Site
                </Button>
            </Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 md:p-8">
            {children}
        </main>
      </div>
    </div>
  )
}
