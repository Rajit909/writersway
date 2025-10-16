import { Feather } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Visionary Voice Home">
       <div className="p-2 bg-primary/20 rounded-lg">
        <Feather className="h-5 w-5 text-primary" />
      </div>
      <span className="font-headline text-xl font-bold text-foreground hidden sm:inline-block">
        Visionary Voice
      </span>
    </Link>
  );
}
