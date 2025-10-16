import { Feather } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Teal Canvas Home">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Feather className="h-5 w-5 text-primary" />
      </div>
      <span className="font-headline text-xl font-bold text-foreground hidden sm:inline-block">
        Teal Canvas
      </span>
    </Link>
  );
}
