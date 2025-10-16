import Link from 'next/link';
import { BlogPostCard } from '@/components/BlogPostCard';
import { getAllPosts, getAllCategories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { NewsletterForm } from '@/components/NewsletterForm';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featuredPosts = posts.slice(0, 3);
  const latestPosts = posts.slice(3, 7);

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 md:py-32 bg-secondary/20 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">
            Welcome to Visionary Voice
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your daily source for the latest in technology, education, and news. We provide insightful articles to keep you ahead of the curve.
          </p>
          <Link href="/posts">
            <Button size="lg">
              Explore Articles <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8 text-center">
              Featured Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => {
                const category = categories.find(c => c.id === post.categoryId);
                return (
                  <BlogPostCard key={post.id} post={post} category={category} />
                );
              })}
            </div>
          </div>
        )}

        {latestPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8 text-center">
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestPosts.map((post) => {
                const category = categories.find(c => c.id === post.categoryId);
                return (
                  <BlogPostCard key={post.id} post={post} category={category} isFeatured />
                );
              })}
            </div>
          </div>
        )}
        
        <div className="mb-16 mt-20">
          <NewsletterForm />
        </div>

        <div>
          <h2 className="text-3xl font-headline font-bold mb-8 text-center">
            Explore by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`} passHref>
                 <Button variant="outline" size="lg">{category.name}</Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
