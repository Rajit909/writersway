import Link from 'next/link';
import { Logo } from './Logo';
import { Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

const socialLinks = [
  { href: '#', icon: <Twitter size={20} />, label: 'Twitter' },
  { href: '#', icon: <Github size={20} />, label: 'GitHub' },
  { href: '#', icon: <Linkedin size={20} />, label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground max-w-xs">
              A dynamic blog exploring the future of technology, design, and education.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex space-x-2">
              {socialLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                  <Button variant="outline" size="icon" aria-label={link.label}>
                    {link.icon}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center">
           <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Visionary Voice. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
            A project by Visionary Voice.
          </p>
        </div>
      </div>
    </footer>
  );
}
