import { getAllPosts, getAllCategories } from '@/lib/data';
import { BlogPostCard } from '@/components/BlogPostCard';
import { Rss } from 'lucide-react';

export default function PostsPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const categoryMap = new Map(categories.map(c => [c.id, c]));

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
         <Rss className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">
          All Articles
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse all of our published content below.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} category={categoryMap.get(post.categoryId)} />
        ))}
      </div>
    </div>
  );
}
