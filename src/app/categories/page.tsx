import Link from 'next/link';
import { getAllCategories } from '@/lib/data';
import { Card, CardTitle } from '@/components/ui/card';
import { FolderKanban } from 'lucide-react';

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">
          Categories
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse posts by topic.
        </p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <Card className="p-6 h-full flex flex-col items-center justify-center text-center hover:bg-accent/50 hover:-translate-y-1 transition-all duration-300">
              <FolderKanban className="w-10 h-10 mb-4 text-primary" />
              <CardTitle className="font-headline text-xl">{category.name}</CardTitle>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
