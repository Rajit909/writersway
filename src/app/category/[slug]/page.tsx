import { notFound } from 'next/navigation';
import { getPostsByCategory, getCategoryBySlug, getAllCategories } from '@/lib/data';
import { BlogPostCard } from '@/components/BlogPostCard';

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(category => ({ slug: category.slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }
  
  const posts = getPostsByCategory(params.slug);
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <p className="text-primary font-medium mb-2">Category</p>
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          {category.name}
        </h1>
      </header>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} category={category} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No posts found in this category yet.</p>
      )}
    </div>
  );
}
